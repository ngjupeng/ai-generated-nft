import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, Preload, PointMaterial } from "@react-three/drei";
import { inCircle } from "maath/random/dist/maath-random.cjs.js";

const Stars = (props: any) => {
  const ref = useRef<any>();
  const [sphere] = useState<any>(() =>
    inCircle(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 10;
    ref.current.rotation.y += delta / 15;
  });

  return (
    <mesh rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </mesh>
  );
};

const StarCanvas = () => {
  return (
    <div className="w-full min-h-screen h-auto absolute top-0 bottom-0 z-[-1] overflow-y-hidden">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarCanvas;
