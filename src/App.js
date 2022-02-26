// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import { Canvas, render, events } from "@react-three/fiber";
import Ground from "./component/Ground.js";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { weightedSearchAlgorithm } from "./algorithm/weightedSearchAlgorithm";

function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [fakegrid, setfakegrid] = useState([]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    });
  }, []);

  const gridsize = 24;
  const griddivision = 20;
  let grid = [];
  let start = {
    row: 3,
    col: 5,
  };
  let finish = {
    row: 16,
    col: 18,
  };

  let colors = {
    default: { r: 1, g: 1, b: 1 },
    start: { r: 0, g: 1, b: 0 },
    finish: { r: 1, g: 0, b: 0 },
    wall: { r: 0.109, g: 0.109, b: 0.45 },
    visited: { r: 0.329, g: 0.27, b: 0.968 },
    path: { r: 1, g: 1, b: 0 },
  };

  const TWEEN = require("@tweenjs/tween.js");

  useEffect(() => {
    for (let row = 0; row < griddivision; row++) {
      let currentRow = [];
      for (let col = 0; col < griddivision; col++) {
        let status = "default";
        if (row === start.row && col === start.col) {
          status = "start";
        } else if (row === finish.row && col === finish.col) {
          status = "finish";
        }
        let node = {
          id: row * griddivision + col,
          row: row,
          col: col,
          position: {
            x: 0.6 + (9 - col) * (gridsize / griddivision),
            y: 0 - (0.85 - 0.9),
            z: 0.6 + (9 - row) * (gridsize / griddivision),
          },
          status: status,
          distance: Infinity,
          totalDistance: Infinity,
          heuristicDistance: null,
          direction: null,
          weight: 0,
          previousNode: null,
          color: "#BBC2D0",
        };
        if (status === "start") {
          node.color = "red";
        } else if (status === "finish") {
          node.color = "green";
        }
        currentRow.push(node);
      }
      grid.push(currentRow);
    }
    setfakegrid(grid);
    // console.log(grid);
  }, []);

  const visualizeAlgorithm = () => {
    let newGrid = [...fakegrid];
    const startNode = newGrid[start.row][start.col];
    const finishNode = newGrid[finish.row][finish.col];
    let nodesToAnimate = [];
    weightedSearchAlgorithm(newGrid, startNode, finishNode, nodesToAnimate);
    // setfakegrid(newGrid);
  };

  return (
    <div
      id="canvas-container"
      style={{ width: size.width, height: size.height }}
    >
      <button id="save" onClick={visualizeAlgorithm}>
        Save
      </button>

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
          position={[0, 0.05, 0]}
        />

        {fakegrid.map((row) => {
          return row.map((node) => {
            return (
              <mesh
                key={node.id}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[node.position.x, node.position.y, node.position.z]}
              >
                <planeGeometry args={[24 / 20, 24 / 20, 3, 3]} />
                <meshLambertMaterial color={node.color} />
              </mesh>
            );
          });
        })}

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
