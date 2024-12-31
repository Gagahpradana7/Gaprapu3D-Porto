import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import scene from "../assets/3d/toon_cat_free.glb";

export default function Cat(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.reset().play().setLoop(2201, Infinity);
    });
  }, [actions]);

  const handleClick = () => {
    window.location.href = "https://gaprapu-porto.vercel.app/about";
  };
  return (
    <group
      onClick={handleClick}
      ref={group}
      {...props}
      dispose={null}
      style={{ cursor: "pointer" }}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="0df7f1c552db41979cdb0b8efba99edffbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Rig" rotation={[-Math.PI / 2, 0, 0]}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_43"
                      geometry={nodes.Object_43.geometry}
                      material={materials.Mat_Gradient}
                      skeleton={nodes.Object_43.skeleton}
                      castShadow
                      receiveShadow
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(scene);
