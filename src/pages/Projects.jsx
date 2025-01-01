import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Shiba from "../models/Shiba";
import Loader from "../components/Loader";

const Projects = () => {
  return (
    <section className="relative flex lg:flex-row flex-col max-container h-screen">
      <div className="flex-1 min-w-[50%] flex flex-col justify-start pt-0">
        <h1 className="head-text">My Projects</h1>
        <p className="mt-2 font-poppins text-slate-gray text-base leading-8 max-w-lg">
          Click the Shiba to see all my projects
        </p>
      </div>
      <div className="lg:w-1/2 w-full lg:h-[400px] md:h-[550px] h-[350px] mb-16 cursor-pointer">
        <Canvas
          camera={{
            position: [0, 2, 5],
            fov: 45,
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[0, 5, 5]} intensity={1} />

          <Suspense fallback={<Loader />}>
            <Shiba position={[0, 0, 0]} scale={[2.5, 2.5, 2.5]} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>
    </section>
  );
};

export default Projects;
