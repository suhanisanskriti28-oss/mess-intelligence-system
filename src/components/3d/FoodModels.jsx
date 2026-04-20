import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const pbrMaterials = {
  glassyFrosting: { color: '#FF69B4', roughness: 0.1, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.1 },
  bread: { color: '#F4A460', roughness: 0.8, metalness: 0.0 },
  cheese: { color: '#FFD700', roughness: 0.4, metalness: 0.1, clearcoat: 0.5, clearcoatRoughness: 0.3 },
  softApple: { color: '#DC143C', roughness: 0.2, metalness: 0.1, clearcoat: 0.8, clearcoatRoughness: 0.2 },
  cupcakeFrosting: { color: '#FF85A1', roughness: 0.15, metalness: 0.05, clearcoat: 0.9, clearcoatRoughness: 0.1 },
  cupcakeBase: { color: '#D2691E', roughness: 0.7, metalness: 0.0 },
  coffeeBody: { color: '#6F4E37', roughness: 0.3, metalness: 0.5, clearcoat: 0.7 },
  coffeeLiquid: { color: '#3B1A08', roughness: 0.1, metalness: 0.0, clearcoat: 1.0, clearcoatRoughness: 0.05 },
  chocolate: { color: '#3D1C02', roughness: 0.25, metalness: 0.1, clearcoat: 0.8, clearcoatRoughness: 0.15 },
  chocolateGold: { color: '#C8860A', roughness: 0.1, metalness: 0.9, clearcoat: 1.0 },
};

export const DonutModel = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    groupRef.current.rotation.x += delta * 0.2;
    groupRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      <mesh>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <meshPhysicalMaterial {...pbrMaterials.bread} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <torusGeometry args={[1, 0.42, 32, 64]} />
        <meshPhysicalMaterial {...pbrMaterials.glassyFrosting} />
      </mesh>
    </group>
  );
};

export const CheeseWedgeModel = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.z += delta * 0.2;
  });
  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={rotation}>
      <cylinderGeometry args={[1, 1, 0.5, 3]} />
      <meshPhysicalMaterial {...pbrMaterials.cheese} />
    </mesh>
  );
};

export const SoftAppleModel = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial {...pbrMaterials.softApple} distort={0.1} speed={2} />
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.9} />
      </mesh>
    </mesh>
  );
};

// === NEW FOOD MODELS ===

export const CupcakeModel = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.25;
  });
  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Paper wrapper */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.55, 0.4, 0.7, 16]} />
        <meshPhysicalMaterial {...pbrMaterials.cupcakeBase} />
      </mesh>
      {/* Cake body */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.6, 0.55, 0.5, 16]} />
        <meshPhysicalMaterial color="#C48A3E" roughness={0.6} metalness={0} />
      </mesh>
      {/* Frosting dome */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial {...pbrMaterials.cupcakeFrosting} />
      </mesh>
      {/* Frosting tip */}
      <mesh position={[0, 1.05, 0]}>
        <coneGeometry args={[0.2, 0.5, 16]} />
        <meshPhysicalMaterial {...pbrMaterials.cupcakeFrosting} />
      </mesh>
      {/* Cherry on top */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial color="#C0392B" roughness={0.2} clearcoat={1} />
      </mesh>
    </group>
  );
};

export const CoffeeCupModel = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Cup body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.35, 1.0, 32]} />
        <meshPhysicalMaterial {...pbrMaterials.coffeeBody} />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.48, 0]}>
        <circleGeometry args={[0.48, 32]} />
        <meshPhysicalMaterial {...pbrMaterials.coffeeLiquid} />
      </mesh>
      {/* Latte art foam ring */}
      <mesh position={[0, 0.49, 0]}>
        <ringGeometry args={[0.1, 0.3, 32]} />
        <meshStandardMaterial color="#F5DEB3" roughness={0.9} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.65, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.06, 8, 16, Math.PI]} />
        <meshPhysicalMaterial {...pbrMaterials.coffeeBody} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.8, 0.75, 0.1, 32]} />
        <meshPhysicalMaterial color="#8B6040" roughness={0.3} metalness={0.4} clearcoat={0.8} />
      </mesh>
    </group>
  );
};

export const ChocolateBarModel = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    groupRef.current.rotation.x += delta * 0.15;
    groupRef.current.rotation.y += delta * 0.2;
  });

  const squares = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      squares.push(
        <mesh key={`${row}-${col}`} position={[col * 0.42 - 0.21, 0.08, row * 0.55 - 0.55]}>
          <boxGeometry args={[0.38, 0.1, 0.5]} />
          <meshPhysicalMaterial color="#5C2A00" roughness={0.2} metalness={0.05} clearcoat={0.9} />
        </mesh>
      );
    }
  }

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Main chocolate block */}
      <mesh>
        <boxGeometry args={[1.0, 0.15, 1.6]} />
        <meshPhysicalMaterial {...pbrMaterials.chocolate} />
      </mesh>
      {/* Embossed squares */}
      {squares}
      {/* Gold foil wrapper */}
      <mesh position={[0, -0.1, -0.6]}>
        <boxGeometry args={[1.05, 0.12, 0.5]} />
        <meshPhysicalMaterial {...pbrMaterials.chocolateGold} />
      </mesh>
    </group>
  );
};

// Glossy hard-candy Toffee — pill-shaped with a twisted wrapper
export const ToffeeModel = ({ position, scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef();
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x += delta * 0.1;
  });

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Main candy body — ellipsoid pill using a sphere scaled on X */}
      <mesh scale={[1.8, 0.8, 0.8]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial
          color="#F4A500"   // Golden amber toffee
          roughness={0.05}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.3}
          ior={1.4}
        />
      </mesh>

      {/* Left wrapper twist — flattened cone pointing left */}
      <mesh position={[-1.0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.25, 0.6, 8]} />
        <meshPhysicalMaterial
          color="#FF6B6B"   // Cheerful red wrapper
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.6}
        />
      </mesh>
      {/* Left wrapper end cap */}
      <mesh position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshPhysicalMaterial color="#CC2222" roughness={0.5} />
      </mesh>

      {/* Right wrapper twist */}
      <mesh position={[1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.25, 0.6, 8]} />
        <meshPhysicalMaterial
          color="#FF6B6B"
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.6}
        />
      </mesh>
      {/* Right wrapper end cap */}
      <mesh position={[1.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshPhysicalMaterial color="#CC2222" roughness={0.5} />
      </mesh>

      {/* Highlight stripe across the candy body */}
      <mesh scale={[1.82, 0.2, 0.82]} position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhysicalMaterial
          color="#FFE680"
          roughness={0.0}
          metalness={0.0}
          clearcoat={1.0}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

