import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { useMount } from 'react-use';
import buildings from '../../mock/building.json';
import Poi from '../webgl/poi';
function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh: any = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

const getPois = () => {
  return buildings.Area.features.map((poi: any) => {
    const res = poi.geometry.coordinates[0].map((point: number[]) =>
    toPoint(point)
    );
    return {
      points: res,
      id: poi.id,
    };
  });
};

const toPoint = ([x, y]: number[]) => {
  const minX = buildings.bounds.min_x;
  const minY = buildings.bounds.min_y;
  const size = buildings.real_size[2];
  return [(x - minX) / (size ), (y - minY) / (size )];
};

const Map = () => {
  const [pois, setPois] = useState<any[]>([]);
  useMount(() => {
    // registerWheelEvent(current);
    const ps = getPois();
    setPois(ps);
    console.log(ps)
  });
  return (
    <Canvas >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {pois.map((p: any)=> <Poi key={p.id} points={p.points} />)}
    </Canvas>
  );
};
export default Map;
