import { useRef, useEffect } from "react";
import { useGLTF, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import skyScene from "../assets/3d/sky.glb";
import { a } from "@react-spring/three";

const Sky = ({ isRotating, setIsRotating, ...props }) => {
  const skyRef = useRef();
  const { gl, viewport } = useThree();
  const sky = useGLTF(skyScene);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  sky.scene.traverse((node) => {
    if (node.isMesh && node.material) {
      node.material.color.set("#07285d");
      node.material.emissive.set("#0a2247");
      node.material.emissiveIntensity = 0.6;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      skyRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;

      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      skyRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      skyRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      skyRef.current.rotation.y += rotationSpeed.current;
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group ref={skyRef} {...props}>
      <mesh>
        <primitive object={sky.scene} />
      </mesh>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.9}
        fade
      />
      <ambientLight intensity={-0.6} />
    </a.group>
  );
};

export default Sky;
