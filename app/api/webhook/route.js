import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { pool } from "@/app/api/pg";

function verifyWebhookSignature(signature, body, secret, timestamp) {
    const dataToSign = timestamp + body;
    const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(dataToSign)
        .digest('base64');

    return generatedSignature === signature;
}

export async function POST(req) {
    try {

       
        const headersList = headers();
        const signature = headersList.get('x-webhook-signature');
        const timestamp = headersList.get('x-webhook-timestamp');


        if (!signature || !timestamp) {    
            return NextResponse.json({ success: false, message: "Missing signature or timestamp" }, { status: 401 });
        }

        const rawBody = await req.text();
        const secretKey = process.env.CASHFREE_SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 });
        }

        const isValidSignature = verifyWebhookSignature(signature, rawBody, secretKey, timestamp);

        if (!isValidSignature) {
            return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 });
        }

        const webhookData = JSON.parse(rawBody);


        const eventType = webhookData.type;
        const data = webhookData.data;

        // Check if payment already exists in database to prevent duplicates
        const checkPaymentQuery = `
            SELECT id FROM payments WHERE payment_id = $1
        `;

        if (data?.payment?.payment_id) {
            const existingPayment = await pool.query(checkPaymentQuery, [data.payment.payment_id]);
            
            if (existingPayment.rows.length > 0) {
                console.log('Payment already exists in database, skipping duplicate entry:', data.payment.payment_id);
                
                // Still update order status if needed, but don't create duplicate payment record
                await updateOrderStatus(eventType, data);
                
                return NextResponse.json({ 
                    success: true, 
                    message: "Webhook processed (duplicate payment, status updated only)" 
                }, { status: 200 });
            }
        }

        // Store only essential payment details with duplicate prevention
        const insertPaymentQuery = `
            INSERT INTO payments (
                order_id, payment_id, payment_amount, payment_currency,
                payment_status
            ) VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (payment_id) 
            DO UPDATE SET
                payment_status = EXCLUDED.payment_status,
                order_id = EXCLUDED.order_id,
                payment_amount = EXCLUDED.payment_amount,
                payment_currency = EXCLUDED.payment_currency
            RETURNING *;
        `;

        // Simple values without complex truncation
        const paymentValues = [
            data?.order?.order_id || null,
            data?.payment?.payment_id || null,
            data?.payment?.payment_amount || null,
            data?.payment?.payment_currency || null,
            data?.payment?.payment_status || null
        ];

        console.log("Inserting payment values:", paymentValues);

        const paymentResult = await pool.query(insertPaymentQuery, paymentValues);
        console.log('Payment details saved/updated:', paymentResult.rows[0]);

        // Update order status based on payment event
        await updateOrderStatus(eventType, data);

        return NextResponse.json({ success: true, message: "Webhook processed" }, { status: 200 });

    } catch (err) {
        console.error("Error processing webhook:", err);
        return NextResponse.json({ 
            success: false, 
            message: "Webhook processing failed",
            error: err.message 
        }, { status: 500 });
    }
}

// Helper function to update order status
async function updateOrderStatus(eventType, data) {
    let orderStatus = "unknown";
    
    switch (eventType) {
        case "PAYMENT_SUCCESS":
        case "PAYMENT_SUCCESS_WEBHOOK":
            orderStatus = "success";

            
            // Award tokens to user upon successful payment
            if (data.order?.order_id) {
                try {
                    // Get order details to find tokens_awarded
                    const orderQuery = `
                        SELECT user_id, tokens_awarded, plan_name, order_id FROM orders WHERE order_id = $1
                    `;
                    const orderResult = await pool.query(orderQuery, [data.order.order_id]);
                    
                    if (orderResult.rows.length > 0) {
                        const { user_id, tokens_awarded, plan_name, order_id } = orderResult.rows[0];
                        
                        console.log(`Processing webhook for order ${order_id}: user_id=${user_id}, tokens_awarded=${tokens_awarded}, plan_name=${plan_name}`);
                        
                        if (user_id && tokens_awarded > 0) {
                            try {
                                console.log(`Attempting to award ${tokens_awarded} tokens to user ${user_id} for plan: ${plan_name}`);
                                
                                // Call token API endpoint
                                const tokenRes = await fetch(`${process.env.SITE_URL}/api/token`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ userId: user_id, tokensToAdd: tokens_awarded }),
                                });

                                const responseData = await tokenRes.json();
                                
                                if (tokenRes.ok) {
                                    console.log(`✅ Successfully awarded ${tokens_awarded} tokens to user ${user_id}. Response:`, responseData);
                                    
                                    // Update order to mark tokens as awarded - FIXED: Use order_id from database
                                    try {
                                        const updateResult = await pool.query(
                                            `UPDATE orders SET tokens_awarded = 0 WHERE order_id = $1 RETURNING order_id`,
                                            [order_id]  // ← FIXED: Use order_id from database, not data.order.order_id
                                        );
                                        
                                        if (updateResult.rows.length > 0) {
                                            console.log(`✅ Order ${order_id} marked as processed (tokens_awarded set to 0)`);
                                        } else {
                                            console.warn(`⚠️ Order update completed but no rows affected for order_id: ${order_id}`);
                                        }
                                        
                                    } catch (updateError) {
                                        console.error(`❌ Database update failed for order ${order_id}:`, updateError.message);
                                    }
                                    
                                } else {
                                    console.error(`❌ Token API returned error status: ${tokenRes.status} - ${tokenRes.statusText}`);
                                    console.error(`❌ Error response:`, responseData);
                                    
                                    if (responseData.error) {
                                        console.error(`❌ API Error: ${responseData.error}`);
                                    }
                                    if (responseData.message) {
                                        console.error(`❌ API Message: ${responseData.message}`);
                                    }
                                }
                                
                            } catch (fetchError) {
                                console.error(`❌ Fetch request failed for token API:`, fetchError.message);
                                console.error(`❌ Stack trace:`, fetchError.stack);
                                
                                if (fetchError.code) {
                                    console.error(`❌ Error code: ${fetchError.code}`);
                                }
                            }
                            
                        } else if (user_id && tokens_awarded === 0) {
                            console.log(`ℹ️  No tokens to award for order ${order_id} (plan: ${plan_name}) - tokens_awarded is already 0`);
                            
                        } else if (!user_id) {
                            console.error(`❌ Invalid user_id (${user_id}) for order ${order_id}`);
                            
                        } else if (tokens_awarded < 0) {
                            console.error(`❌ Negative tokens_awarded value (${tokens_awarded}) for order ${order_id}`);
                        }
                    } else {
                        console.warn(`⚠️ No order found for order_id: ${data.order.order_id}`);
                    }
                } catch (tokenError) {
                    console.error('Error awarding tokens:', tokenError);
                }
            }
            break;
        case "PAYMENT_FAILED":
            orderStatus = "failed";
            break;
        case "PAYMENT_PENDING":
            orderStatus = "pending";
            break;
        case "REFUND_SUCCESS":
            orderStatus = "refunded";
            break;
        case "PAYMENT_CHARGES_WEBHOOK":
            orderStatus = "charged";
            break;
    }

    if (orderStatus !== "unknown" && data?.order?.order_id) {
        const updateOrderQuery = `
            UPDATE orders 
            SET status = $1, updated_at = CURRENT_TIMESTAMP
            WHERE order_id = $2
            RETURNING *;
        `;

        try {
            const orderResult = await pool.query(updateOrderQuery, [orderStatus, data.order.order_id]);
            console.log('Order status updated:', orderResult.rows[0]);
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    }
}