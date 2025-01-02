import { useRef, useEffect, useMemo } from "react";
import { useGLTF, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import skyScene from "../assets/3d/sky.glb";
import { a } from "@react-spring/three";

const Sky = ({ isRotating, setIsRotating = () => {}, ...props }) => {
  const skyRef = useRef();
  const starsRef = useRef();
  const { gl, viewport } = useThree();
  const sky = useGLTF(skyScene);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const time = useRef(0);

  const starsConfig = useMemo(() => {
    const isMobile = viewport.width < 768;
    return {
      radius: isMobile ? 140 : 125,
      depth: isMobile ? 1.5 : 1.2,
      count: isMobile ? 3000 : 9000,
      factor: isMobile ? 6 : 5,
      saturation: 1,
    };
  }, [viewport.width]);

  sky.scene.traverse((node) => {
    if (node.isMesh && node.material) {
      node.material.color.set("#020518");
      node.material.emissive.set("#0a1854");
      node.material.emissiveIntensity = 0.8;
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

  useFrame((state, delta) => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.0001) {
        rotationSpeed.current = 0;
      }
      skyRef.current.rotation.y += rotationSpeed.current * delta;
    }

    time.current += delta * 2;
    if (starsRef.current) {
      const pulse = Math.sin(time.current) * 0.5 + 0.5;
      starsRef.current.material.opacity = 0.5 + pulse * 0.5;
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
        ref={starsRef}
        radius={starsConfig.radius}
        depth={starsConfig.depth}
        count={starsConfig.count}
        factor={starsConfig.factor}
        saturation={starsConfig.saturation}
        fade
      />
      <ambientLight intensity={-0.75} />
    </a.group>
  );
};

export default Sky;
