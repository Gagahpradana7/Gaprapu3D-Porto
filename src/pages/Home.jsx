import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { MoveLeft, MoveRight, X } from "lucide-react";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import zelda from "../assets/zelda.mp3";
import soundon from "../assets/icons/soundon.png";
import soundoff from "../assets/icons/soundoff.png";

const TutorialOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(null);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    setShowOverlay(hasSeenTutorial !== "true");
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem("hasSeenTutorial", "true");
      setShowOverlay(false);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setShowOverlay(false);
    }
  };

  if (showOverlay === null) return null;
  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/90 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome To My 3D Portfolio !
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <MoveLeft className="w-8 h-8 text-blue-600 animate-pulse" />
            <p className="text-gray-700">
              Swipe left or use the arrow key on your PC to rotate the island
              portfolio.
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <MoveRight className="w-8 h-8 text-blue-600 animate-pulse" />
            <p className="text-gray-700">
              Swipe right or use the arrow key on your PC to rotate the island
              portfolio.
            </p>
          </div>

          <p className="text-sm text-gray-600 text-center">
            Explore different views of the island portfolio to discover more
            information
          </p>
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const audioRef = useRef(null);
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio(zelda);
    audioRef.current.volume = 0.7;
    audioRef.current.loop = true;

    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        setIsPlaying(false);
      }
    };
    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return { screenScale, screenPosition, rotation };
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return { screenScale, screenPosition };
  };

  const {
    screenScale: islandScale,
    screenPosition: islandPosition,
    rotation: islandRotation,
  } = adjustIslandForScreenSize();

  const { screenScale: planeScale, screenPosition: planePosition } =
    adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={1} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={0.5}
          />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlaying ? soundoff : soundon}
          alt="sound"
          className="sm:w-12 w-10 xl:h-10 h-40 sm:h-60 cursor-pointer object-contain"
          onClick={() => setIsPlaying(!isPlaying)}
        />
      </div>

      <TutorialOverlay />
    </section>
  );
};

export default Home;
