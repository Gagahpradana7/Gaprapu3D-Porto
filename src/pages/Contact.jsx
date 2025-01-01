import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Fox from "../models/Fox";
import Loader from "../components/Loader";
const Contact = () => {
  return (
    <section className="relative flex lg:flex-row flex-col max-container h-screen">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Contact me</h1>
        <p className="mt-2 font-poppins text-slate-gray text-base leading-8 max-w-lg">
          Click the fox if you want to contact me
        </p>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] mt-0 mb-16 cursor-pointer">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={2} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.6, 0.6, 0.6]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
