import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const Nebula = () => {
  const ref = useRef<any>();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 10;
    ref.current.rotation.y += delta / 15;
  });
  const [particles] = useState<Float32Array>(
    () =>
      new Float32Array(
        Array.from({ length: 5000 * 3 }, () => Math.random() * 50 - 25)
      )
  );

  return (
    <Points ref={ref} positions={particles}>
      <PointMaterial
        color="#ff00ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        transparent={true}
      />
    </Points>
  );
};

const NebulaCanvas = () => {
  return (
    <div className="w-full h-screen absolute top-0 bottom-0 z-[-1] overflow-y-hidden">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Nebula />
      </Canvas>
    </div>
  );
};

export default NebulaCanvas;
