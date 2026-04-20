import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import {
  DonutModel, CheeseWedgeModel, SoftAppleModel,
  CupcakeModel, ToffeeModel, ChocolateBarModel
} from '../3d/FoodModels';

// The entire group of food items orbits / shifts with the mouse for parallax
const FriendlyFoodFragments = ({ mouseX, mouseY, isMobile }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const factor = isMobile ? 0.2 : 1;
    // Smooth-lerp the entire group toward the mouse offset
    groupRef.current.rotation.y += (mouseX * 0.4 - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (-mouseY * 0.3 - groupRef.current.rotation.x) * 0.06;
    // Slight XY positional shift for a genuine parallax depth feel
    groupRef.current.position.x += (mouseX * 1.5 - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (mouseY * 1.0 - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Donut — front left */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <DonutModel position={[-4, 2, -5]} scale={1.2} rotation={[Math.PI / 4, 0, 0]} />
      </Float>

      {/* Cheese Wedge — front right */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        <CheeseWedgeModel position={[5, -1, -6]} scale={1.5} rotation={[0, Math.PI / 2, 0]} />
      </Float>

      {/* Apple — top center */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
        <SoftAppleModel position={[2, 4, -4]} scale={0.9} />
      </Float>

      {/* Secondary Donut — back left */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={2}>
        <DonutModel position={[-6, -3, -8]} scale={0.8} rotation={[-Math.PI / 2, Math.PI / 4, 0]} />
      </Float>

      {/* Secondary Apple — back right */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <SoftAppleModel position={[6, 3, -10]} scale={1.1} />
      </Float>

      {/* Cupcake — lower left */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <CupcakeModel position={[-5, -4, -7]} scale={0.9} />
      </Float>

      {!isMobile && (
        <>
          {/* Cupcake — upper right back */}
          <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.8}>
            <CupcakeModel position={[7, 5, -12]} scale={1.1} />
          </Float>

          {/* Toffee — upper left */}
          <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.1}>
            <ToffeeModel position={[-7, 5, -13]} scale={1.2} />
          </Float>

          {/* Chocolate Bar — upper left back */}
          <Float speed={1.1} rotationIntensity={0.9} floatIntensity={0.7}>
            <ChocolateBarModel position={[-8, 2, -14]} scale={1.2} rotation={[-0.2, 0.8, 0.1]} />
          </Float>
        </>
      )}

      {/* Toffee — right mid */}
      <Float speed={2.0} rotationIntensity={1.2} floatIntensity={1.6}>
        <ToffeeModel position={[8, -2, -9]} scale={1.0} />
      </Float>

      {/* Toffee — lower center back */}
      <Float speed={2.6} rotationIntensity={0.7} floatIntensity={2.0}>
        <ToffeeModel position={[1, -6, -11]} scale={0.85} rotation={[0, 0.5, 0.3]} />
      </Float>

      {/* Chocolate Bar — lower right */}
      <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.3}>
        <ChocolateBarModel position={[4, -5, -10]} scale={1.0} rotation={[0.3, 0.5, 0]} />
      </Float>

      <ContactShadows position={[0, -6, 0]} opacity={0.2} scale={25} blur={2.5} far={14} color="#800000" />
    </group>
  );
};

const Global3DProvider = ({ children }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Raw DOM mouse tracking — more responsive than Three.js pointer state
  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,   // -1 … +1
        y: -((e.clientY / window.innerHeight) * 2 - 1), // +1 … -1 (inverted Y)
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#FDFBF7] text-[#4A3728] overflow-hidden transition-colors duration-500">

      {/* Universal 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Only render 3D on non-mini devices for performance and responsiveness */}
        {window.innerWidth > 480 && (
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFFFFF" />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FFF8DC" />

            <Suspense fallback={null}>
              <FriendlyFoodFragments mouseX={mouse.x} mouseY={mouse.y} isMobile={isMobile} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Main App Content */}
      <div className="relative z-10 w-full h-full min-h-screen overflow-y-auto">
        {children}
      </div>

    </div>
  );
};

export default Global3DProvider;
