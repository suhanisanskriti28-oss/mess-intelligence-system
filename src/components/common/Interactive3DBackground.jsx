import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { DonutModel, CheeseWedgeModel, SoftAppleModel } from '../3d/FoodModels';

// Camera tracking logic for global scene parallax
const SceneRig = () => {
  const group = useRef();

  useFrame((state, delta) => {
    // Math.lerp smoothly interpolates the camera angle toward the mouse coords
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);

    // Rotate the entire group slightly based on mouse
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      {/* Floating 3D Donut */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <DonutModel position={[-3, 1, -2]} scale={0.8} rotation={[Math.PI / 4, 0, 0]} />
      </Float>

      {/* Floating Cheese Wedge */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <CheeseWedgeModel position={[4, -1, -3]} scale={1.2} rotation={[0, Math.PI / 2, 0]} />
      </Float>

      {/* Floating Organic Apple */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <SoftAppleModel position={[2, 3, -1]} scale={0.7} />
      </Float>
      
      {/* Secondary Donut further back */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={3}>
        <DonutModel position={[-5, -2, -5]} scale={0.6} rotation={[-Math.PI / 2, Math.PI / 4, 0]} />
      </Float>

      {/* Ambient shadow plane at the bottom for grounding */}
      <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={10} />
    </group>
  );
};

// High-Fidelity 3D Composition Wrapper
const Interactive3DBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-darkBg flex items-center justify-center">
      
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          {/* Soft ambient lighting mixed with highly polished Studio HDR reflections */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          
          <Suspense fallback={null}>
            <SceneRig />
            {/* Extremely important for that 'Spline' metallic reflection look */}
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      {/* Glassmorphic UI Layer (Foreground) */}
      <div className="relative z-10 w-full h-full p-6 flex justify-center items-center pointer-events-none">
        {/* We use pointer-events-none here to let mouse events pass thru to the Canvas, 
            but we re-enable pointer events on the children container below */}
        <div className="pointer-events-auto w-full max-w-4xl">
          {children}
        </div>
      </div>
      
    </div>
  );
};

export default Interactive3DBackground;
