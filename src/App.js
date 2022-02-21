// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
// import { Physics, useCylinder, usePlane } from '@react-three/cannon'
import { Canvas, render, events } from "@react-three/fiber";
import Ground from "./component/Ground.js";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { GridHelper } from "three";

function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    });
  }, []);

  const gridsize = 24;
  const griddivision = 20;

  const initgrid = () => {
    console.log("initgrid");
  };

  return (
    <div
      id="canvas-container"
      style={{ width: size.width, height: size.height }}
    >
      <Canvas
        pixelRatio={window.devicePixelRatio}
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [20, 10, -20], fov: 50 }}
        render={{ scroll: true, debounce: { scroll: 50, resize: 1 } }}
      >
        <fog attach="fog" args={["#000000", 0, 750]} />
        <Ground />
        <ambientLight intensity={1} color="#ffffff" />
        <hemisphereLight color="#ff3633" intensity={0.1} position={[0, 5, 0]} />
        <directionalLight
          position={[-1, 1.75, 1]}
          intensity={1}
          color="#ffe5e5"
          castShadow
        />
        <gridHelper
          args={[gridsize, griddivision, "#5c78bd", "#5c78bd"]}
          rotation={[0, 0, -0.075]}
          position={[0, 0.05, 0]}
        />

        <mesh
          rotation={[-Math.PI / 2, (Math.PI / 2) * 0.05, 0]}
          position={[0.6, 0, 0.6 + 9 * (gridsize / griddivision)]}
        >
          <planeGeometry args={[24 / 20, 24 / 20, 3, 3]} />
          <meshLambertMaterial color="red" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
