import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Tube, Float } from '@react-three/drei';
import * as THREE from 'three';

// Create a wavy mathematical curve for the glowing "energy trail"
const CustomCurve = class extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 10 - 5;
    const ty = Math.sin(t * Math.PI * 4) * 2;
    const tz = Math.cos(t * Math.PI * 2) * 1.5;
    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
};

const HeroScene = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const outerRef = useRef();
  const innerRef = useRef();
  const tubeRef = useRef();

  const path = useMemo(() => new CustomCurve(1.5), []);

  useFrame((state, delta) => {
    // Slowly rotate the floating cube arrays
    outerRef.current.rotation.x += delta * 0.05;
    outerRef.current.rotation.y += delta * 0.1;
    
    innerRef.current.rotation.x -= delta * 0.1;
    innerRef.current.rotation.y -= delta * 0.15;

    // Optional: Animate the tube material
    if (tubeRef.current) {
      tubeRef.current.material.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 2);
    }
  });

  const darkGlossyMaterial = new THREE.MeshPhysicalMaterial({
    color: '#080808',
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const neonRedTrailMaterial = new THREE.MeshPhysicalMaterial({
    color: '#050505',
    emissive: '#ff003c', // Bright red/orange glow
    emissiveIntensity: 3,
    toneMapped: false,
    roughness: 0.1,
  });

  const neonOrangeMaterial = new THREE.MeshStandardMaterial({
    color: '#050505',
    emissive: '#ff5e00',
    emissiveIntensity: 2,
    toneMapped: false,
  });

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <pointLight color="#ff003c" intensity={40} distance={15} decay={2} position={[0,0,2]} />
      <pointLight color="#ff5e00" intensity={30} distance={15} decay={2} position={[2,2,-2]} />

      {/* Central focus cube */}
      <Box ref={innerRef} args={[1, 1, 1]} position={[0,0,0]}>
        <primitive object={darkGlossyMaterial} attach="material" />
      </Box>

      {/* Array of glossy black cubes */}
      <group ref={outerRef}>
        <Box args={[0.5, 0.5, 0.5]} position={[2, 1, 1]}><primitive object={darkGlossyMaterial} attach="material" /></Box>
        <Box args={[0.8, 0.8, 0.8]} position={[-2, -1, -1]}><primitive object={darkGlossyMaterial} attach="material" /></Box>
        <Box args={[0.6, 0.6, 0.6]} position={[-1.5, 2, 0]}><primitive object={darkGlossyMaterial} attach="material" /></Box>
        <Box args={[0.4, 0.4, 0.4]} position={[1, -2, 2]}><primitive object={darkGlossyMaterial} attach="material" /></Box>
        
        {/* A couple glowing accents matching the cubes */}
        <Box args={[0.3, 0.3, 0.3]} position={[1.5, -1.5, 0]}><primitive object={neonOrangeMaterial} attach="material" /></Box>
        <Box args={[0.2, 0.2, 0.2]} position={[-1, 1, 2]}><primitive object={neonRedTrailMaterial} attach="material" /></Box>
      </group>

      {/* The wavy glowing trail winding through the cubes */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={tubeRef}>
          <tubeGeometry args={[path, 100, 0.05, 8, false]} />
          <primitive object={neonRedTrailMaterial} attach="material" />
        </mesh>
      </Float>
    </group>
  );
};

export default HeroScene;
