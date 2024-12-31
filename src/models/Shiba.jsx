import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import scene from "../assets/3d/shiba.glb";

export default function Shiba(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(scene);

  const handleClick = () => {
    window.location.href = "https://gaprapu-porto.vercel.app/work";
  };

  return (
    <group onClick={handleClick} ref={group} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group18985_default_0.geometry}
        material={materials["default"]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box002_default_0.geometry}
        material={materials["default"]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object001_default_0.geometry}
        material={materials["default"]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload(scene);
