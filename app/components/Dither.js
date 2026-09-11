'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

const vertexShader = `varying vec2 vUv; void main(){vUv=uv; gl_Position=vec4(position,1.0);}`;
const fragmentShader = `precision highp float; varying vec2 vUv; uniform float time; uniform vec2 resolution; uniform vec2 pointer;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);} float noise(vec2 p){vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
void main(){vec2 uv=vUv; vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.); float n=noise(p*3.0+time*.12)+noise(p*7.0-time*.08)*.35; float wave=sin(p.x*7.0+p.y*5.0+n*4.0-time*.35)*.5+.5; float glow=1.0-smoothstep(0.0,.8,length(p-pointer)); float value=clamp(wave*.42+n*.42+glow*.22,0.,1.); float d=step(.5,fract((gl_FragCoord.x+gl_FragCoord.y)*.18)); float tone=step(.34,value)+step(.58,value)*.35+step(.78,value)*.28; tone=clamp(tone+d*.12,0.,1.); vec3 ink=mix(vec3(.04,.055,.07),vec3(.42,.48,.52),tone); gl_FragColor=vec4(ink,1.);}`;

function Scene(){
  const material=useRef(); const {size}=useThree();
  useFrame(({clock,pointer})=>{ if(material.current){material.current.uniforms.time.value=clock.getElapsedTime(); material.current.uniforms.pointer.value.set(pointer.x*.65,pointer.y*.5); material.current.uniforms.resolution.value.set(size.width,size.height);} });
  return <mesh><planeGeometry args={[2,2]}/><shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{time:{value:0},resolution:{value:{set(){}}},pointer:{value:{set(){}}}}}/></mesh>;
}
export default function Dither(){return <Canvas className="dither-container" dpr={[1,1.5]} camera={{position:[0,0,1]}}><Scene/></Canvas>}
