
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model job_applications
 * 
 */
export type job_applications = $Result.DefaultSelection<Prisma.$job_applicationsPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model user_profiles
 * 
 */
export type user_profiles = $Result.DefaultSelection<Prisma.$user_profilesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Job_applications
 * const job_applications = await prisma.job_applications.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Job_applications
   * const job_applications = await prisma.job_applications.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.job_applications`: Exposes CRUD operations for the **job_applications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Job_applications
    * const job_applications = await prisma.job_applications.findMany()
    * ```
    */
  get job_applications(): Prisma.job_applicationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_profiles`: Exposes CRUD operations for the **user_profiles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_profiles
    * const user_profiles = await prisma.user_profiles.findMany()
    * ```
    */
  get user_profiles(): Prisma.user_profilesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    job_applications: 'job_applications',
    users: 'users',
    user_profiles: 'user_profiles'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "job_applications" | "users" | "user_profiles"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      job_applications: {
        payload: Prisma.$job_applicationsPayload<ExtArgs>
        fields: Prisma.job_applicationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.job_applicationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.job_applicationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>
          }
          findFirst: {
            args: Prisma.job_applicationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.job_applicationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>
          }
          findMany: {
            args: Prisma.job_applicationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>[]
          }
          create: {
            args: Prisma.job_applicationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>
          }
          createMany: {
            args: Prisma.job_applicationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.job_applicationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>[]
          }
          delete: {
            args: Prisma.job_applicationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>
          }
          update: {
            args: Prisma.job_applicationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>
          }
          deleteMany: {
            args: Prisma.job_applicationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.job_applicationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.job_applicationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>[]
          }
          upsert: {
            args: Prisma.job_applicationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$job_applicationsPayload>
          }
          aggregate: {
            args: Prisma.Job_applicationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob_applications>
          }
          groupBy: {
            args: Prisma.job_applicationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Job_applicationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.job_applicationsCountArgs<ExtArgs>
            result: $Utils.Optional<Job_applicationsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      user_profiles: {
        payload: Prisma.$user_profilesPayload<ExtArgs>
        fields: Prisma.user_profilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_profilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_profilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>
          }
          findFirst: {
            args: Prisma.user_profilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_profilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>
          }
          findMany: {
            args: Prisma.user_profilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>[]
          }
          create: {
            args: Prisma.user_profilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>
          }
          createMany: {
            args: Prisma.user_profilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_profilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>[]
          }
          delete: {
            args: Prisma.user_profilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>
          }
          update: {
            args: Prisma.user_profilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>
          }
          deleteMany: {
            args: Prisma.user_profilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_profilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_profilesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>[]
          }
          upsert: {
            args: Prisma.user_profilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilesPayload>
          }
          aggregate: {
            args: Prisma.User_profilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_profiles>
          }
          groupBy: {
            args: Prisma.user_profilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_profilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_profilesCountArgs<ExtArgs>
            result: $Utils.Optional<User_profilesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    job_applications?: job_applicationsOmit
    users?: usersOmit
    user_profiles?: user_profilesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    job_applications: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_applications?: boolean | UsersCountOutputTypeCountJob_applicationsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountJob_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: job_applicationsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model job_applications
   */

  export type AggregateJob_applications = {
    _count: Job_applicationsCountAggregateOutputType | null
    _avg: Job_applicationsAvgAggregateOutputType | null
    _sum: Job_applicationsSumAggregateOutputType | null
    _min: Job_applicationsMinAggregateOutputType | null
    _max: Job_applicationsMaxAggregateOutputType | null
  }

  export type Job_applicationsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type Job_applicationsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type Job_applicationsMinAggregateOutputType = {
    id: number | null
    company: string | null
    position: string | null
    status: string | null
    notes: string | null
    created_at: Date | null
    user_id: number | null
  }

  export type Job_applicationsMaxAggregateOutputType = {
    id: number | null
    company: string | null
    position: string | null
    status: string | null
    notes: string | null
    created_at: Date | null
    user_id: number | null
  }

  export type Job_applicationsCountAggregateOutputType = {
    id: number
    company: number
    position: number
    status: number
    notes: number
    created_at: number
    user_id: number
    _all: number
  }


  export type Job_applicationsAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type Job_applicationsSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type Job_applicationsMinAggregateInputType = {
    id?: true
    company?: true
    position?: true
    status?: true
    notes?: true
    created_at?: true
    user_id?: true
  }

  export type Job_applicationsMaxAggregateInputType = {
    id?: true
    company?: true
    position?: true
    status?: true
    notes?: true
    created_at?: true
    user_id?: true
  }

  export type Job_applicationsCountAggregateInputType = {
    id?: true
    company?: true
    position?: true
    status?: true
    notes?: true
    created_at?: true
    user_id?: true
    _all?: true
  }

  export type Job_applicationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which job_applications to aggregate.
     */
    where?: job_applicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_applications to fetch.
     */
    orderBy?: job_applicationsOrderByWithRelationInput | job_applicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: job_applicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned job_applications
    **/
    _count?: true | Job_applicationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Job_applicationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Job_applicationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Job_applicationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Job_applicationsMaxAggregateInputType
  }

  export type GetJob_applicationsAggregateType<T extends Job_applicationsAggregateArgs> = {
        [P in keyof T & keyof AggregateJob_applications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob_applications[P]>
      : GetScalarType<T[P], AggregateJob_applications[P]>
  }




  export type job_applicationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: job_applicationsWhereInput
    orderBy?: job_applicationsOrderByWithAggregationInput | job_applicationsOrderByWithAggregationInput[]
    by: Job_applicationsScalarFieldEnum[] | Job_applicationsScalarFieldEnum
    having?: job_applicationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Job_applicationsCountAggregateInputType | true
    _avg?: Job_applicationsAvgAggregateInputType
    _sum?: Job_applicationsSumAggregateInputType
    _min?: Job_applicationsMinAggregateInputType
    _max?: Job_applicationsMaxAggregateInputType
  }

  export type Job_applicationsGroupByOutputType = {
    id: number
    company: string
    position: string
    status: string
    notes: string | null
    created_at: Date | null
    user_id: number | null
    _count: Job_applicationsCountAggregateOutputType | null
    _avg: Job_applicationsAvgAggregateOutputType | null
    _sum: Job_applicationsSumAggregateOutputType | null
    _min: Job_applicationsMinAggregateOutputType | null
    _max: Job_applicationsMaxAggregateOutputType | null
  }

  type GetJob_applicationsGroupByPayload<T extends job_applicationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Job_applicationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Job_applicationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Job_applicationsGroupByOutputType[P]>
            : GetScalarType<T[P], Job_applicationsGroupByOutputType[P]>
        }
      >
    >


  export type job_applicationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    position?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    user_id?: boolean
    users?: boolean | job_applications$usersArgs<ExtArgs>
  }, ExtArgs["result"]["job_applications"]>

  export type job_applicationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    position?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    user_id?: boolean
    users?: boolean | job_applications$usersArgs<ExtArgs>
  }, ExtArgs["result"]["job_applications"]>

  export type job_applicationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company?: boolean
    position?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    user_id?: boolean
    users?: boolean | job_applications$usersArgs<ExtArgs>
  }, ExtArgs["result"]["job_applications"]>

  export type job_applicationsSelectScalar = {
    id?: boolean
    company?: boolean
    position?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    user_id?: boolean
  }

  export type job_applicationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "company" | "position" | "status" | "notes" | "created_at" | "user_id", ExtArgs["result"]["job_applications"]>
  export type job_applicationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | job_applications$usersArgs<ExtArgs>
  }
  export type job_applicationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | job_applications$usersArgs<ExtArgs>
  }
  export type job_applicationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | job_applications$usersArgs<ExtArgs>
  }

  export type $job_applicationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "job_applications"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      company: string
      position: string
      status: string
      notes: string | null
      created_at: Date | null
      user_id: number | null
    }, ExtArgs["result"]["job_applications"]>
    composites: {}
  }

  type job_applicationsGetPayload<S extends boolean | null | undefined | job_applicationsDefaultArgs> = $Result.GetResult<Prisma.$job_applicationsPayload, S>

  type job_applicationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<job_applicationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Job_applicationsCountAggregateInputType | true
    }

  export interface job_applicationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['job_applications'], meta: { name: 'job_applications' } }
    /**
     * Find zero or one Job_applications that matches the filter.
     * @param {job_applicationsFindUniqueArgs} args - Arguments to find a Job_applications
     * @example
     * // Get one Job_applications
     * const job_applications = await prisma.job_applications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends job_applicationsFindUniqueArgs>(args: SelectSubset<T, job_applicationsFindUniqueArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job_applications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {job_applicationsFindUniqueOrThrowArgs} args - Arguments to find a Job_applications
     * @example
     * // Get one Job_applications
     * const job_applications = await prisma.job_applications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends job_applicationsFindUniqueOrThrowArgs>(args: SelectSubset<T, job_applicationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job_applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_applicationsFindFirstArgs} args - Arguments to find a Job_applications
     * @example
     * // Get one Job_applications
     * const job_applications = await prisma.job_applications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends job_applicationsFindFirstArgs>(args?: SelectSubset<T, job_applicationsFindFirstArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job_applications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_applicationsFindFirstOrThrowArgs} args - Arguments to find a Job_applications
     * @example
     * // Get one Job_applications
     * const job_applications = await prisma.job_applications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends job_applicationsFindFirstOrThrowArgs>(args?: SelectSubset<T, job_applicationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Job_applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_applicationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Job_applications
     * const job_applications = await prisma.job_applications.findMany()
     * 
     * // Get first 10 Job_applications
     * const job_applications = await prisma.job_applications.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const job_applicationsWithIdOnly = await prisma.job_applications.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends job_applicationsFindManyArgs>(args?: SelectSubset<T, job_applicationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job_applications.
     * @param {job_applicationsCreateArgs} args - Arguments to create a Job_applications.
     * @example
     * // Create one Job_applications
     * const Job_applications = await prisma.job_applications.create({
     *   data: {
     *     // ... data to create a Job_applications
     *   }
     * })
     * 
     */
    create<T extends job_applicationsCreateArgs>(args: SelectSubset<T, job_applicationsCreateArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Job_applications.
     * @param {job_applicationsCreateManyArgs} args - Arguments to create many Job_applications.
     * @example
     * // Create many Job_applications
     * const job_applications = await prisma.job_applications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends job_applicationsCreateManyArgs>(args?: SelectSubset<T, job_applicationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Job_applications and returns the data saved in the database.
     * @param {job_applicationsCreateManyAndReturnArgs} args - Arguments to create many Job_applications.
     * @example
     * // Create many Job_applications
     * const job_applications = await prisma.job_applications.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Job_applications and only return the `id`
     * const job_applicationsWithIdOnly = await prisma.job_applications.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends job_applicationsCreateManyAndReturnArgs>(args?: SelectSubset<T, job_applicationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job_applications.
     * @param {job_applicationsDeleteArgs} args - Arguments to delete one Job_applications.
     * @example
     * // Delete one Job_applications
     * const Job_applications = await prisma.job_applications.delete({
     *   where: {
     *     // ... filter to delete one Job_applications
     *   }
     * })
     * 
     */
    delete<T extends job_applicationsDeleteArgs>(args: SelectSubset<T, job_applicationsDeleteArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job_applications.
     * @param {job_applicationsUpdateArgs} args - Arguments to update one Job_applications.
     * @example
     * // Update one Job_applications
     * const job_applications = await prisma.job_applications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends job_applicationsUpdateArgs>(args: SelectSubset<T, job_applicationsUpdateArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Job_applications.
     * @param {job_applicationsDeleteManyArgs} args - Arguments to filter Job_applications to delete.
     * @example
     * // Delete a few Job_applications
     * const { count } = await prisma.job_applications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends job_applicationsDeleteManyArgs>(args?: SelectSubset<T, job_applicationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Job_applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_applicationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Job_applications
     * const job_applications = await prisma.job_applications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends job_applicationsUpdateManyArgs>(args: SelectSubset<T, job_applicationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Job_applications and returns the data updated in the database.
     * @param {job_applicationsUpdateManyAndReturnArgs} args - Arguments to update many Job_applications.
     * @example
     * // Update many Job_applications
     * const job_applications = await prisma.job_applications.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Job_applications and only return the `id`
     * const job_applicationsWithIdOnly = await prisma.job_applications.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends job_applicationsUpdateManyAndReturnArgs>(args: SelectSubset<T, job_applicationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job_applications.
     * @param {job_applicationsUpsertArgs} args - Arguments to update or create a Job_applications.
     * @example
     * // Update or create a Job_applications
     * const job_applications = await prisma.job_applications.upsert({
     *   create: {
     *     // ... data to create a Job_applications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job_applications we want to update
     *   }
     * })
     */
    upsert<T extends job_applicationsUpsertArgs>(args: SelectSubset<T, job_applicationsUpsertArgs<ExtArgs>>): Prisma__job_applicationsClient<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Job_applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_applicationsCountArgs} args - Arguments to filter Job_applications to count.
     * @example
     * // Count the number of Job_applications
     * const count = await prisma.job_applications.count({
     *   where: {
     *     // ... the filter for the Job_applications we want to count
     *   }
     * })
    **/
    count<T extends job_applicationsCountArgs>(
      args?: Subset<T, job_applicationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Job_applicationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job_applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Job_applicationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Job_applicationsAggregateArgs>(args: Subset<T, Job_applicationsAggregateArgs>): Prisma.PrismaPromise<GetJob_applicationsAggregateType<T>>

    /**
     * Group by Job_applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {job_applicationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends job_applicationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: job_applicationsGroupByArgs['orderBy'] }
        : { orderBy?: job_applicationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, job_applicationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJob_applicationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the job_applications model
   */
  readonly fields: job_applicationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for job_applications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__job_applicationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends job_applications$usersArgs<ExtArgs> = {}>(args?: Subset<T, job_applications$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the job_applications model
   */
  interface job_applicationsFieldRefs {
    readonly id: FieldRef<"job_applications", 'Int'>
    readonly company: FieldRef<"job_applications", 'String'>
    readonly position: FieldRef<"job_applications", 'String'>
    readonly status: FieldRef<"job_applications", 'String'>
    readonly notes: FieldRef<"job_applications", 'String'>
    readonly created_at: FieldRef<"job_applications", 'DateTime'>
    readonly user_id: FieldRef<"job_applications", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * job_applications findUnique
   */
  export type job_applicationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * Filter, which job_applications to fetch.
     */
    where: job_applicationsWhereUniqueInput
  }

  /**
   * job_applications findUniqueOrThrow
   */
  export type job_applicationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * Filter, which job_applications to fetch.
     */
    where: job_applicationsWhereUniqueInput
  }

  /**
   * job_applications findFirst
   */
  export type job_applicationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * Filter, which job_applications to fetch.
     */
    where?: job_applicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_applications to fetch.
     */
    orderBy?: job_applicationsOrderByWithRelationInput | job_applicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for job_applications.
     */
    cursor?: job_applicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of job_applications.
     */
    distinct?: Job_applicationsScalarFieldEnum | Job_applicationsScalarFieldEnum[]
  }

  /**
   * job_applications findFirstOrThrow
   */
  export type job_applicationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * Filter, which job_applications to fetch.
     */
    where?: job_applicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_applications to fetch.
     */
    orderBy?: job_applicationsOrderByWithRelationInput | job_applicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for job_applications.
     */
    cursor?: job_applicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of job_applications.
     */
    distinct?: Job_applicationsScalarFieldEnum | Job_applicationsScalarFieldEnum[]
  }

  /**
   * job_applications findMany
   */
  export type job_applicationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * Filter, which job_applications to fetch.
     */
    where?: job_applicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of job_applications to fetch.
     */
    orderBy?: job_applicationsOrderByWithRelationInput | job_applicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing job_applications.
     */
    cursor?: job_applicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` job_applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` job_applications.
     */
    skip?: number
    distinct?: Job_applicationsScalarFieldEnum | Job_applicationsScalarFieldEnum[]
  }

  /**
   * job_applications create
   */
  export type job_applicationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * The data needed to create a job_applications.
     */
    data: XOR<job_applicationsCreateInput, job_applicationsUncheckedCreateInput>
  }

  /**
   * job_applications createMany
   */
  export type job_applicationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many job_applications.
     */
    data: job_applicationsCreateManyInput | job_applicationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * job_applications createManyAndReturn
   */
  export type job_applicationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * The data used to create many job_applications.
     */
    data: job_applicationsCreateManyInput | job_applicationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * job_applications update
   */
  export type job_applicationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * The data needed to update a job_applications.
     */
    data: XOR<job_applicationsUpdateInput, job_applicationsUncheckedUpdateInput>
    /**
     * Choose, which job_applications to update.
     */
    where: job_applicationsWhereUniqueInput
  }

  /**
   * job_applications updateMany
   */
  export type job_applicationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update job_applications.
     */
    data: XOR<job_applicationsUpdateManyMutationInput, job_applicationsUncheckedUpdateManyInput>
    /**
     * Filter which job_applications to update
     */
    where?: job_applicationsWhereInput
    /**
     * Limit how many job_applications to update.
     */
    limit?: number
  }

  /**
   * job_applications updateManyAndReturn
   */
  export type job_applicationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * The data used to update job_applications.
     */
    data: XOR<job_applicationsUpdateManyMutationInput, job_applicationsUncheckedUpdateManyInput>
    /**
     * Filter which job_applications to update
     */
    where?: job_applicationsWhereInput
    /**
     * Limit how many job_applications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * job_applications upsert
   */
  export type job_applicationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * The filter to search for the job_applications to update in case it exists.
     */
    where: job_applicationsWhereUniqueInput
    /**
     * In case the job_applications found by the `where` argument doesn't exist, create a new job_applications with this data.
     */
    create: XOR<job_applicationsCreateInput, job_applicationsUncheckedCreateInput>
    /**
     * In case the job_applications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<job_applicationsUpdateInput, job_applicationsUncheckedUpdateInput>
  }

  /**
   * job_applications delete
   */
  export type job_applicationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    /**
     * Filter which job_applications to delete.
     */
    where: job_applicationsWhereUniqueInput
  }

  /**
   * job_applications deleteMany
   */
  export type job_applicationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which job_applications to delete
     */
    where?: job_applicationsWhereInput
    /**
     * Limit how many job_applications to delete.
     */
    limit?: number
  }

  /**
   * job_applications.users
   */
  export type job_applications$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * job_applications without action
   */
  export type job_applicationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    name: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    email: string
    name: string | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    job_applications?: boolean | users$job_applicationsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_applications?: boolean | users$job_applicationsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      job_applications: Prisma.$job_applicationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job_applications<T extends users$job_applicationsArgs<ExtArgs> = {}>(args?: Subset<T, users$job_applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$job_applicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly email: FieldRef<"users", 'String'>
    readonly name: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.job_applications
   */
  export type users$job_applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job_applications
     */
    select?: job_applicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job_applications
     */
    omit?: job_applicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: job_applicationsInclude<ExtArgs> | null
    where?: job_applicationsWhereInput
    orderBy?: job_applicationsOrderByWithRelationInput | job_applicationsOrderByWithRelationInput[]
    cursor?: job_applicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Job_applicationsScalarFieldEnum | Job_applicationsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model user_profiles
   */

  export type AggregateUser_profiles = {
    _count: User_profilesCountAggregateOutputType | null
    _avg: User_profilesAvgAggregateOutputType | null
    _sum: User_profilesSumAggregateOutputType | null
    _min: User_profilesMinAggregateOutputType | null
    _max: User_profilesMaxAggregateOutputType | null
  }

  export type User_profilesAvgAggregateOutputType = {
    id: number | null
  }

  export type User_profilesSumAggregateOutputType = {
    id: number | null
  }

  export type User_profilesMinAggregateOutputType = {
    id: number | null
    full_name: string | null
    email: string | null
    phone: string | null
    summary: string | null
  }

  export type User_profilesMaxAggregateOutputType = {
    id: number | null
    full_name: string | null
    email: string | null
    phone: string | null
    summary: string | null
  }

  export type User_profilesCountAggregateOutputType = {
    id: number
    full_name: number
    email: number
    phone: number
    summary: number
    education: number
    experience: number
    skills: number
    certifications: number
    _all: number
  }


  export type User_profilesAvgAggregateInputType = {
    id?: true
  }

  export type User_profilesSumAggregateInputType = {
    id?: true
  }

  export type User_profilesMinAggregateInputType = {
    id?: true
    full_name?: true
    email?: true
    phone?: true
    summary?: true
  }

  export type User_profilesMaxAggregateInputType = {
    id?: true
    full_name?: true
    email?: true
    phone?: true
    summary?: true
  }

  export type User_profilesCountAggregateInputType = {
    id?: true
    full_name?: true
    email?: true
    phone?: true
    summary?: true
    education?: true
    experience?: true
    skills?: true
    certifications?: true
    _all?: true
  }

  export type User_profilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_profiles to aggregate.
     */
    where?: user_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profilesOrderByWithRelationInput | user_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_profiles
    **/
    _count?: true | User_profilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_profilesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_profilesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_profilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_profilesMaxAggregateInputType
  }

  export type GetUser_profilesAggregateType<T extends User_profilesAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_profiles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_profiles[P]>
      : GetScalarType<T[P], AggregateUser_profiles[P]>
  }




  export type user_profilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_profilesWhereInput
    orderBy?: user_profilesOrderByWithAggregationInput | user_profilesOrderByWithAggregationInput[]
    by: User_profilesScalarFieldEnum[] | User_profilesScalarFieldEnum
    having?: user_profilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_profilesCountAggregateInputType | true
    _avg?: User_profilesAvgAggregateInputType
    _sum?: User_profilesSumAggregateInputType
    _min?: User_profilesMinAggregateInputType
    _max?: User_profilesMaxAggregateInputType
  }

  export type User_profilesGroupByOutputType = {
    id: number
    full_name: string
    email: string
    phone: string | null
    summary: string | null
    education: JsonValue | null
    experience: JsonValue | null
    skills: string[]
    certifications: string[]
    _count: User_profilesCountAggregateOutputType | null
    _avg: User_profilesAvgAggregateOutputType | null
    _sum: User_profilesSumAggregateOutputType | null
    _min: User_profilesMinAggregateOutputType | null
    _max: User_profilesMaxAggregateOutputType | null
  }

  type GetUser_profilesGroupByPayload<T extends user_profilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_profilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_profilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_profilesGroupByOutputType[P]>
            : GetScalarType<T[P], User_profilesGroupByOutputType[P]>
        }
      >
    >


  export type user_profilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    summary?: boolean
    education?: boolean
    experience?: boolean
    skills?: boolean
    certifications?: boolean
  }, ExtArgs["result"]["user_profiles"]>

  export type user_profilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    summary?: boolean
    education?: boolean
    experience?: boolean
    skills?: boolean
    certifications?: boolean
  }, ExtArgs["result"]["user_profiles"]>

  export type user_profilesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    summary?: boolean
    education?: boolean
    experience?: boolean
    skills?: boolean
    certifications?: boolean
  }, ExtArgs["result"]["user_profiles"]>

  export type user_profilesSelectScalar = {
    id?: boolean
    full_name?: boolean
    email?: boolean
    phone?: boolean
    summary?: boolean
    education?: boolean
    experience?: boolean
    skills?: boolean
    certifications?: boolean
  }

  export type user_profilesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "full_name" | "email" | "phone" | "summary" | "education" | "experience" | "skills" | "certifications", ExtArgs["result"]["user_profiles"]>

  export type $user_profilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_profiles"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      full_name: string
      email: string
      phone: string | null
      summary: string | null
      education: Prisma.JsonValue | null
      experience: Prisma.JsonValue | null
      skills: string[]
      certifications: string[]
    }, ExtArgs["result"]["user_profiles"]>
    composites: {}
  }

  type user_profilesGetPayload<S extends boolean | null | undefined | user_profilesDefaultArgs> = $Result.GetResult<Prisma.$user_profilesPayload, S>

  type user_profilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_profilesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_profilesCountAggregateInputType | true
    }

  export interface user_profilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_profiles'], meta: { name: 'user_profiles' } }
    /**
     * Find zero or one User_profiles that matches the filter.
     * @param {user_profilesFindUniqueArgs} args - Arguments to find a User_profiles
     * @example
     * // Get one User_profiles
     * const user_profiles = await prisma.user_profiles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_profilesFindUniqueArgs>(args: SelectSubset<T, user_profilesFindUniqueArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_profiles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_profilesFindUniqueOrThrowArgs} args - Arguments to find a User_profiles
     * @example
     * // Get one User_profiles
     * const user_profiles = await prisma.user_profiles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_profilesFindUniqueOrThrowArgs>(args: SelectSubset<T, user_profilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profilesFindFirstArgs} args - Arguments to find a User_profiles
     * @example
     * // Get one User_profiles
     * const user_profiles = await prisma.user_profiles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_profilesFindFirstArgs>(args?: SelectSubset<T, user_profilesFindFirstArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_profiles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profilesFindFirstOrThrowArgs} args - Arguments to find a User_profiles
     * @example
     * // Get one User_profiles
     * const user_profiles = await prisma.user_profiles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_profilesFindFirstOrThrowArgs>(args?: SelectSubset<T, user_profilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_profiles
     * const user_profiles = await prisma.user_profiles.findMany()
     * 
     * // Get first 10 User_profiles
     * const user_profiles = await prisma.user_profiles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_profilesWithIdOnly = await prisma.user_profiles.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_profilesFindManyArgs>(args?: SelectSubset<T, user_profilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_profiles.
     * @param {user_profilesCreateArgs} args - Arguments to create a User_profiles.
     * @example
     * // Create one User_profiles
     * const User_profiles = await prisma.user_profiles.create({
     *   data: {
     *     // ... data to create a User_profiles
     *   }
     * })
     * 
     */
    create<T extends user_profilesCreateArgs>(args: SelectSubset<T, user_profilesCreateArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_profiles.
     * @param {user_profilesCreateManyArgs} args - Arguments to create many User_profiles.
     * @example
     * // Create many User_profiles
     * const user_profiles = await prisma.user_profiles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_profilesCreateManyArgs>(args?: SelectSubset<T, user_profilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_profiles and returns the data saved in the database.
     * @param {user_profilesCreateManyAndReturnArgs} args - Arguments to create many User_profiles.
     * @example
     * // Create many User_profiles
     * const user_profiles = await prisma.user_profiles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_profiles and only return the `id`
     * const user_profilesWithIdOnly = await prisma.user_profiles.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_profilesCreateManyAndReturnArgs>(args?: SelectSubset<T, user_profilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_profiles.
     * @param {user_profilesDeleteArgs} args - Arguments to delete one User_profiles.
     * @example
     * // Delete one User_profiles
     * const User_profiles = await prisma.user_profiles.delete({
     *   where: {
     *     // ... filter to delete one User_profiles
     *   }
     * })
     * 
     */
    delete<T extends user_profilesDeleteArgs>(args: SelectSubset<T, user_profilesDeleteArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_profiles.
     * @param {user_profilesUpdateArgs} args - Arguments to update one User_profiles.
     * @example
     * // Update one User_profiles
     * const user_profiles = await prisma.user_profiles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_profilesUpdateArgs>(args: SelectSubset<T, user_profilesUpdateArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_profiles.
     * @param {user_profilesDeleteManyArgs} args - Arguments to filter User_profiles to delete.
     * @example
     * // Delete a few User_profiles
     * const { count } = await prisma.user_profiles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_profilesDeleteManyArgs>(args?: SelectSubset<T, user_profilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_profiles
     * const user_profiles = await prisma.user_profiles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_profilesUpdateManyArgs>(args: SelectSubset<T, user_profilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_profiles and returns the data updated in the database.
     * @param {user_profilesUpdateManyAndReturnArgs} args - Arguments to update many User_profiles.
     * @example
     * // Update many User_profiles
     * const user_profiles = await prisma.user_profiles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_profiles and only return the `id`
     * const user_profilesWithIdOnly = await prisma.user_profiles.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_profilesUpdateManyAndReturnArgs>(args: SelectSubset<T, user_profilesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_profiles.
     * @param {user_profilesUpsertArgs} args - Arguments to update or create a User_profiles.
     * @example
     * // Update or create a User_profiles
     * const user_profiles = await prisma.user_profiles.upsert({
     *   create: {
     *     // ... data to create a User_profiles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_profiles we want to update
     *   }
     * })
     */
    upsert<T extends user_profilesUpsertArgs>(args: SelectSubset<T, user_profilesUpsertArgs<ExtArgs>>): Prisma__user_profilesClient<$Result.GetResult<Prisma.$user_profilesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profilesCountArgs} args - Arguments to filter User_profiles to count.
     * @example
     * // Count the number of User_profiles
     * const count = await prisma.user_profiles.count({
     *   where: {
     *     // ... the filter for the User_profiles we want to count
     *   }
     * })
    **/
    count<T extends user_profilesCountArgs>(
      args?: Subset<T, user_profilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_profilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_profilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_profilesAggregateArgs>(args: Subset<T, User_profilesAggregateArgs>): Prisma.PrismaPromise<GetUser_profilesAggregateType<T>>

    /**
     * Group by User_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profilesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_profilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_profilesGroupByArgs['orderBy'] }
        : { orderBy?: user_profilesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_profilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_profilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_profiles model
   */
  readonly fields: user_profilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_profiles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_profilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_profiles model
   */
  interface user_profilesFieldRefs {
    readonly id: FieldRef<"user_profiles", 'Int'>
    readonly full_name: FieldRef<"user_profiles", 'String'>
    readonly email: FieldRef<"user_profiles", 'String'>
    readonly phone: FieldRef<"user_profiles", 'String'>
    readonly summary: FieldRef<"user_profiles", 'String'>
    readonly education: FieldRef<"user_profiles", 'Json'>
    readonly experience: FieldRef<"user_profiles", 'Json'>
    readonly skills: FieldRef<"user_profiles", 'String[]'>
    readonly certifications: FieldRef<"user_profiles", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * user_profiles findUnique
   */
  export type user_profilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * Filter, which user_profiles to fetch.
     */
    where: user_profilesWhereUniqueInput
  }

  /**
   * user_profiles findUniqueOrThrow
   */
  export type user_profilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * Filter, which user_profiles to fetch.
     */
    where: user_profilesWhereUniqueInput
  }

  /**
   * user_profiles findFirst
   */
  export type user_profilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * Filter, which user_profiles to fetch.
     */
    where?: user_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profilesOrderByWithRelationInput | user_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_profiles.
     */
    cursor?: user_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_profiles.
     */
    distinct?: User_profilesScalarFieldEnum | User_profilesScalarFieldEnum[]
  }

  /**
   * user_profiles findFirstOrThrow
   */
  export type user_profilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * Filter, which user_profiles to fetch.
     */
    where?: user_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profilesOrderByWithRelationInput | user_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_profiles.
     */
    cursor?: user_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_profiles.
     */
    distinct?: User_profilesScalarFieldEnum | User_profilesScalarFieldEnum[]
  }

  /**
   * user_profiles findMany
   */
  export type user_profilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * Filter, which user_profiles to fetch.
     */
    where?: user_profilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profilesOrderByWithRelationInput | user_profilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_profiles.
     */
    cursor?: user_profilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    distinct?: User_profilesScalarFieldEnum | User_profilesScalarFieldEnum[]
  }

  /**
   * user_profiles create
   */
  export type user_profilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * The data needed to create a user_profiles.
     */
    data: XOR<user_profilesCreateInput, user_profilesUncheckedCreateInput>
  }

  /**
   * user_profiles createMany
   */
  export type user_profilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_profiles.
     */
    data: user_profilesCreateManyInput | user_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_profiles createManyAndReturn
   */
  export type user_profilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * The data used to create many user_profiles.
     */
    data: user_profilesCreateManyInput | user_profilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_profiles update
   */
  export type user_profilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * The data needed to update a user_profiles.
     */
    data: XOR<user_profilesUpdateInput, user_profilesUncheckedUpdateInput>
    /**
     * Choose, which user_profiles to update.
     */
    where: user_profilesWhereUniqueInput
  }

  /**
   * user_profiles updateMany
   */
  export type user_profilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_profiles.
     */
    data: XOR<user_profilesUpdateManyMutationInput, user_profilesUncheckedUpdateManyInput>
    /**
     * Filter which user_profiles to update
     */
    where?: user_profilesWhereInput
    /**
     * Limit how many user_profiles to update.
     */
    limit?: number
  }

  /**
   * user_profiles updateManyAndReturn
   */
  export type user_profilesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * The data used to update user_profiles.
     */
    data: XOR<user_profilesUpdateManyMutationInput, user_profilesUncheckedUpdateManyInput>
    /**
     * Filter which user_profiles to update
     */
    where?: user_profilesWhereInput
    /**
     * Limit how many user_profiles to update.
     */
    limit?: number
  }

  /**
   * user_profiles upsert
   */
  export type user_profilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * The filter to search for the user_profiles to update in case it exists.
     */
    where: user_profilesWhereUniqueInput
    /**
     * In case the user_profiles found by the `where` argument doesn't exist, create a new user_profiles with this data.
     */
    create: XOR<user_profilesCreateInput, user_profilesUncheckedCreateInput>
    /**
     * In case the user_profiles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_profilesUpdateInput, user_profilesUncheckedUpdateInput>
  }

  /**
   * user_profiles delete
   */
  export type user_profilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
    /**
     * Filter which user_profiles to delete.
     */
    where: user_profilesWhereUniqueInput
  }

  /**
   * user_profiles deleteMany
   */
  export type user_profilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_profiles to delete
     */
    where?: user_profilesWhereInput
    /**
     * Limit how many user_profiles to delete.
     */
    limit?: number
  }

  /**
   * user_profiles without action
   */
  export type user_profilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profiles
     */
    select?: user_profilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profiles
     */
    omit?: user_profilesOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Job_applicationsScalarFieldEnum: {
    id: 'id',
    company: 'company',
    position: 'position',
    status: 'status',
    notes: 'notes',
    created_at: 'created_at',
    user_id: 'user_id'
  };

  export type Job_applicationsScalarFieldEnum = (typeof Job_applicationsScalarFieldEnum)[keyof typeof Job_applicationsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const User_profilesScalarFieldEnum: {
    id: 'id',
    full_name: 'full_name',
    email: 'email',
    phone: 'phone',
    summary: 'summary',
    education: 'education',
    experience: 'experience',
    skills: 'skills',
    certifications: 'certifications'
  };

  export type User_profilesScalarFieldEnum = (typeof User_profilesScalarFieldEnum)[keyof typeof User_profilesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type job_applicationsWhereInput = {
    AND?: job_applicationsWhereInput | job_applicationsWhereInput[]
    OR?: job_applicationsWhereInput[]
    NOT?: job_applicationsWhereInput | job_applicationsWhereInput[]
    id?: IntFilter<"job_applications"> | number
    company?: StringFilter<"job_applications"> | string
    position?: StringFilter<"job_applications"> | string
    status?: StringFilter<"job_applications"> | string
    notes?: StringNullableFilter<"job_applications"> | string | null
    created_at?: DateTimeNullableFilter<"job_applications"> | Date | string | null
    user_id?: IntNullableFilter<"job_applications"> | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type job_applicationsOrderByWithRelationInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type job_applicationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: job_applicationsWhereInput | job_applicationsWhereInput[]
    OR?: job_applicationsWhereInput[]
    NOT?: job_applicationsWhereInput | job_applicationsWhereInput[]
    company?: StringFilter<"job_applications"> | string
    position?: StringFilter<"job_applications"> | string
    status?: StringFilter<"job_applications"> | string
    notes?: StringNullableFilter<"job_applications"> | string | null
    created_at?: DateTimeNullableFilter<"job_applications"> | Date | string | null
    user_id?: IntNullableFilter<"job_applications"> | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type job_applicationsOrderByWithAggregationInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    user_id?: SortOrderInput | SortOrder
    _count?: job_applicationsCountOrderByAggregateInput
    _avg?: job_applicationsAvgOrderByAggregateInput
    _max?: job_applicationsMaxOrderByAggregateInput
    _min?: job_applicationsMinOrderByAggregateInput
    _sum?: job_applicationsSumOrderByAggregateInput
  }

  export type job_applicationsScalarWhereWithAggregatesInput = {
    AND?: job_applicationsScalarWhereWithAggregatesInput | job_applicationsScalarWhereWithAggregatesInput[]
    OR?: job_applicationsScalarWhereWithAggregatesInput[]
    NOT?: job_applicationsScalarWhereWithAggregatesInput | job_applicationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"job_applications"> | number
    company?: StringWithAggregatesFilter<"job_applications"> | string
    position?: StringWithAggregatesFilter<"job_applications"> | string
    status?: StringWithAggregatesFilter<"job_applications"> | string
    notes?: StringNullableWithAggregatesFilter<"job_applications"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"job_applications"> | Date | string | null
    user_id?: IntNullableWithAggregatesFilter<"job_applications"> | number | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    email?: StringFilter<"users"> | string
    name?: StringNullableFilter<"users"> | string | null
    job_applications?: Job_applicationsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    job_applications?: job_applicationsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringNullableFilter<"users"> | string | null
    job_applications?: Job_applicationsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    email?: StringWithAggregatesFilter<"users"> | string
    name?: StringNullableWithAggregatesFilter<"users"> | string | null
  }

  export type user_profilesWhereInput = {
    AND?: user_profilesWhereInput | user_profilesWhereInput[]
    OR?: user_profilesWhereInput[]
    NOT?: user_profilesWhereInput | user_profilesWhereInput[]
    id?: IntFilter<"user_profiles"> | number
    full_name?: StringFilter<"user_profiles"> | string
    email?: StringFilter<"user_profiles"> | string
    phone?: StringNullableFilter<"user_profiles"> | string | null
    summary?: StringNullableFilter<"user_profiles"> | string | null
    education?: JsonNullableFilter<"user_profiles">
    experience?: JsonNullableFilter<"user_profiles">
    skills?: StringNullableListFilter<"user_profiles">
    certifications?: StringNullableListFilter<"user_profiles">
  }

  export type user_profilesOrderByWithRelationInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    skills?: SortOrder
    certifications?: SortOrder
  }

  export type user_profilesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: user_profilesWhereInput | user_profilesWhereInput[]
    OR?: user_profilesWhereInput[]
    NOT?: user_profilesWhereInput | user_profilesWhereInput[]
    full_name?: StringFilter<"user_profiles"> | string
    phone?: StringNullableFilter<"user_profiles"> | string | null
    summary?: StringNullableFilter<"user_profiles"> | string | null
    education?: JsonNullableFilter<"user_profiles">
    experience?: JsonNullableFilter<"user_profiles">
    skills?: StringNullableListFilter<"user_profiles">
    certifications?: StringNullableListFilter<"user_profiles">
  }, "id" | "email">

  export type user_profilesOrderByWithAggregationInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    experience?: SortOrderInput | SortOrder
    skills?: SortOrder
    certifications?: SortOrder
    _count?: user_profilesCountOrderByAggregateInput
    _avg?: user_profilesAvgOrderByAggregateInput
    _max?: user_profilesMaxOrderByAggregateInput
    _min?: user_profilesMinOrderByAggregateInput
    _sum?: user_profilesSumOrderByAggregateInput
  }

  export type user_profilesScalarWhereWithAggregatesInput = {
    AND?: user_profilesScalarWhereWithAggregatesInput | user_profilesScalarWhereWithAggregatesInput[]
    OR?: user_profilesScalarWhereWithAggregatesInput[]
    NOT?: user_profilesScalarWhereWithAggregatesInput | user_profilesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user_profiles"> | number
    full_name?: StringWithAggregatesFilter<"user_profiles"> | string
    email?: StringWithAggregatesFilter<"user_profiles"> | string
    phone?: StringNullableWithAggregatesFilter<"user_profiles"> | string | null
    summary?: StringNullableWithAggregatesFilter<"user_profiles"> | string | null
    education?: JsonNullableWithAggregatesFilter<"user_profiles">
    experience?: JsonNullableWithAggregatesFilter<"user_profiles">
    skills?: StringNullableListFilter<"user_profiles">
    certifications?: StringNullableListFilter<"user_profiles">
  }

  export type job_applicationsCreateInput = {
    company: string
    position: string
    status: string
    notes?: string | null
    created_at?: Date | string | null
    users?: usersCreateNestedOneWithoutJob_applicationsInput
  }

  export type job_applicationsUncheckedCreateInput = {
    id?: number
    company: string
    position: string
    status: string
    notes?: string | null
    created_at?: Date | string | null
    user_id?: number | null
  }

  export type job_applicationsUpdateInput = {
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutJob_applicationsNestedInput
  }

  export type job_applicationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type job_applicationsCreateManyInput = {
    id?: number
    company: string
    position: string
    status: string
    notes?: string | null
    created_at?: Date | string | null
    user_id?: number | null
  }

  export type job_applicationsUpdateManyMutationInput = {
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_applicationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type usersCreateInput = {
    email: string
    name?: string | null
    job_applications?: job_applicationsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    job_applications?: job_applicationsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    job_applications?: job_applicationsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    job_applications?: job_applicationsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    email: string
    name?: string | null
  }

  export type usersUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_profilesCreateInput = {
    full_name: string
    email: string
    phone?: string | null
    summary?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    experience?: NullableJsonNullValueInput | InputJsonValue
    skills?: user_profilesCreateskillsInput | string[]
    certifications?: user_profilesCreatecertificationsInput | string[]
  }

  export type user_profilesUncheckedCreateInput = {
    id?: number
    full_name: string
    email: string
    phone?: string | null
    summary?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    experience?: NullableJsonNullValueInput | InputJsonValue
    skills?: user_profilesCreateskillsInput | string[]
    certifications?: user_profilesCreatecertificationsInput | string[]
  }

  export type user_profilesUpdateInput = {
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    experience?: NullableJsonNullValueInput | InputJsonValue
    skills?: user_profilesUpdateskillsInput | string[]
    certifications?: user_profilesUpdatecertificationsInput | string[]
  }

  export type user_profilesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    experience?: NullableJsonNullValueInput | InputJsonValue
    skills?: user_profilesUpdateskillsInput | string[]
    certifications?: user_profilesUpdatecertificationsInput | string[]
  }

  export type user_profilesCreateManyInput = {
    id?: number
    full_name: string
    email: string
    phone?: string | null
    summary?: string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    experience?: NullableJsonNullValueInput | InputJsonValue
    skills?: user_profilesCreateskillsInput | string[]
    certifications?: user_profilesCreatecertificationsInput | string[]
  }

  export type user_profilesUpdateManyMutationInput = {
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    experience?: NullableJsonNullValueInput | InputJsonValue
    skills?: user_profilesUpdateskillsInput | string[]
    certifications?: user_profilesUpdatecertificationsInput | string[]
  }

  export type user_profilesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableJsonNullValueInput | InputJsonValue
    experience?: NullableJsonNullValueInput | InputJsonValue
    skills?: user_profilesUpdateskillsInput | string[]
    certifications?: user_profilesUpdatecertificationsInput | string[]
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type job_applicationsCountOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type job_applicationsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type job_applicationsMaxOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type job_applicationsMinOrderByAggregateInput = {
    id?: SortOrder
    company?: SortOrder
    position?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
    user_id?: SortOrder
  }

  export type job_applicationsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type Job_applicationsListRelationFilter = {
    every?: job_applicationsWhereInput
    some?: job_applicationsWhereInput
    none?: job_applicationsWhereInput
  }

  export type job_applicationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type user_profilesCountOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
    education?: SortOrder
    experience?: SortOrder
    skills?: SortOrder
    certifications?: SortOrder
  }

  export type user_profilesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type user_profilesMaxOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
  }

  export type user_profilesMinOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
  }

  export type user_profilesSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type usersCreateNestedOneWithoutJob_applicationsInput = {
    create?: XOR<usersCreateWithoutJob_applicationsInput, usersUncheckedCreateWithoutJob_applicationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutJob_applicationsInput
    connect?: usersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usersUpdateOneWithoutJob_applicationsNestedInput = {
    create?: XOR<usersCreateWithoutJob_applicationsInput, usersUncheckedCreateWithoutJob_applicationsInput>
    connectOrCreate?: usersCreateOrConnectWithoutJob_applicationsInput
    upsert?: usersUpsertWithoutJob_applicationsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutJob_applicationsInput, usersUpdateWithoutJob_applicationsInput>, usersUncheckedUpdateWithoutJob_applicationsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type job_applicationsCreateNestedManyWithoutUsersInput = {
    create?: XOR<job_applicationsCreateWithoutUsersInput, job_applicationsUncheckedCreateWithoutUsersInput> | job_applicationsCreateWithoutUsersInput[] | job_applicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: job_applicationsCreateOrConnectWithoutUsersInput | job_applicationsCreateOrConnectWithoutUsersInput[]
    createMany?: job_applicationsCreateManyUsersInputEnvelope
    connect?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
  }

  export type job_applicationsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<job_applicationsCreateWithoutUsersInput, job_applicationsUncheckedCreateWithoutUsersInput> | job_applicationsCreateWithoutUsersInput[] | job_applicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: job_applicationsCreateOrConnectWithoutUsersInput | job_applicationsCreateOrConnectWithoutUsersInput[]
    createMany?: job_applicationsCreateManyUsersInputEnvelope
    connect?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
  }

  export type job_applicationsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<job_applicationsCreateWithoutUsersInput, job_applicationsUncheckedCreateWithoutUsersInput> | job_applicationsCreateWithoutUsersInput[] | job_applicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: job_applicationsCreateOrConnectWithoutUsersInput | job_applicationsCreateOrConnectWithoutUsersInput[]
    upsert?: job_applicationsUpsertWithWhereUniqueWithoutUsersInput | job_applicationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: job_applicationsCreateManyUsersInputEnvelope
    set?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    disconnect?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    delete?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    connect?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    update?: job_applicationsUpdateWithWhereUniqueWithoutUsersInput | job_applicationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: job_applicationsUpdateManyWithWhereWithoutUsersInput | job_applicationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: job_applicationsScalarWhereInput | job_applicationsScalarWhereInput[]
  }

  export type job_applicationsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<job_applicationsCreateWithoutUsersInput, job_applicationsUncheckedCreateWithoutUsersInput> | job_applicationsCreateWithoutUsersInput[] | job_applicationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: job_applicationsCreateOrConnectWithoutUsersInput | job_applicationsCreateOrConnectWithoutUsersInput[]
    upsert?: job_applicationsUpsertWithWhereUniqueWithoutUsersInput | job_applicationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: job_applicationsCreateManyUsersInputEnvelope
    set?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    disconnect?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    delete?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    connect?: job_applicationsWhereUniqueInput | job_applicationsWhereUniqueInput[]
    update?: job_applicationsUpdateWithWhereUniqueWithoutUsersInput | job_applicationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: job_applicationsUpdateManyWithWhereWithoutUsersInput | job_applicationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: job_applicationsScalarWhereInput | job_applicationsScalarWhereInput[]
  }

  export type user_profilesCreateskillsInput = {
    set: string[]
  }

  export type user_profilesCreatecertificationsInput = {
    set: string[]
  }

  export type user_profilesUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type user_profilesUpdatecertificationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type usersCreateWithoutJob_applicationsInput = {
    email: string
    name?: string | null
  }

  export type usersUncheckedCreateWithoutJob_applicationsInput = {
    id?: number
    email: string
    name?: string | null
  }

  export type usersCreateOrConnectWithoutJob_applicationsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutJob_applicationsInput, usersUncheckedCreateWithoutJob_applicationsInput>
  }

  export type usersUpsertWithoutJob_applicationsInput = {
    update: XOR<usersUpdateWithoutJob_applicationsInput, usersUncheckedUpdateWithoutJob_applicationsInput>
    create: XOR<usersCreateWithoutJob_applicationsInput, usersUncheckedCreateWithoutJob_applicationsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutJob_applicationsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutJob_applicationsInput, usersUncheckedUpdateWithoutJob_applicationsInput>
  }

  export type usersUpdateWithoutJob_applicationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateWithoutJob_applicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type job_applicationsCreateWithoutUsersInput = {
    company: string
    position: string
    status: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type job_applicationsUncheckedCreateWithoutUsersInput = {
    id?: number
    company: string
    position: string
    status: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type job_applicationsCreateOrConnectWithoutUsersInput = {
    where: job_applicationsWhereUniqueInput
    create: XOR<job_applicationsCreateWithoutUsersInput, job_applicationsUncheckedCreateWithoutUsersInput>
  }

  export type job_applicationsCreateManyUsersInputEnvelope = {
    data: job_applicationsCreateManyUsersInput | job_applicationsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type job_applicationsUpsertWithWhereUniqueWithoutUsersInput = {
    where: job_applicationsWhereUniqueInput
    update: XOR<job_applicationsUpdateWithoutUsersInput, job_applicationsUncheckedUpdateWithoutUsersInput>
    create: XOR<job_applicationsCreateWithoutUsersInput, job_applicationsUncheckedCreateWithoutUsersInput>
  }

  export type job_applicationsUpdateWithWhereUniqueWithoutUsersInput = {
    where: job_applicationsWhereUniqueInput
    data: XOR<job_applicationsUpdateWithoutUsersInput, job_applicationsUncheckedUpdateWithoutUsersInput>
  }

  export type job_applicationsUpdateManyWithWhereWithoutUsersInput = {
    where: job_applicationsScalarWhereInput
    data: XOR<job_applicationsUpdateManyMutationInput, job_applicationsUncheckedUpdateManyWithoutUsersInput>
  }

  export type job_applicationsScalarWhereInput = {
    AND?: job_applicationsScalarWhereInput | job_applicationsScalarWhereInput[]
    OR?: job_applicationsScalarWhereInput[]
    NOT?: job_applicationsScalarWhereInput | job_applicationsScalarWhereInput[]
    id?: IntFilter<"job_applications"> | number
    company?: StringFilter<"job_applications"> | string
    position?: StringFilter<"job_applications"> | string
    status?: StringFilter<"job_applications"> | string
    notes?: StringNullableFilter<"job_applications"> | string | null
    created_at?: DateTimeNullableFilter<"job_applications"> | Date | string | null
    user_id?: IntNullableFilter<"job_applications"> | number | null
  }

  export type job_applicationsCreateManyUsersInput = {
    id?: number
    company: string
    position: string
    status: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type job_applicationsUpdateWithoutUsersInput = {
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_applicationsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type job_applicationsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    position?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}