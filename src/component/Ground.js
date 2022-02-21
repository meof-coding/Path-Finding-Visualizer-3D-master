import { MeshLambertMaterial, PlaneGeometry } from "three";

export default function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, (Math.PI / 2) * 0.05, 0]}>
      <planeGeometry args={[24, 24, 3, 3]} />
      <meshLambertMaterial color="#BBC2D0" />
    </mesh>
  );
}
