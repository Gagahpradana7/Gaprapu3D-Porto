import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { OrbitControls, SpotLight } from "@react-three/drei";
import Cat from "../models/Cat";
import Loader from "../components/Loader";

const About = () => {
  return (
    <section className="relative flex lg:flex-row flex-col max-container h-screen">
      <div className="flex-1 min-w-[50%] flex flex-col justify-start pt-0">
        <h1 className="head-text">About me</h1>
        <p className="mt-2 font-poppins text-slate-gray text-base leading-8 max-w-lg">
          Click the cat if you want to know more about me
        </p>
      </div>
      <div className="lg:w-1/2 w-full lg:h-[600px] md:h-[550px] h-[350px] xl:mb-24 mb-28 cursor-pointer">
        <Canvas
          camera={{
            position: [0, 1.5, 3],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          style={{ background: "transparent" }}
        >
          <SpotLight
            position={[5, 5, 5]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1.5} castShadow />

          <Suspense fallback={<Loader />}>
            <Cat
              position={[0, -0.5, 0]}
              rotation={[0, Math.PI / 4, 0]}
              scale={[0.4, 0.4, 0.4]}
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>
    </section>
  );
};

export default About;
