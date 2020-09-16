import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { useMount } from 'react-use';
import buildings from '../mock/building.json';
import Poi from './poi';

const getPois = (stage: any) => {
  return buildings.Area.features.map((poi: any) => {
    const res = poi.geometry.coordinates[0].map((point: number[]) =>
      toPoint(point, stage)
    );
    return {
      points: res,
      id: poi.id,
    };
  });
};

const getScale = (stage: any) => {
  const { bounds } = buildings;
  const { min_x, max_x, min_y, max_y } = bounds;
  const ws = (max_x - min_x) / stage.getWidth();
  const hs = (max_y - min_y) / stage.getHeight();
  return ws > hs ? ws : hs;
};

const toPoint = ([x, y]: number[], stage: any) => {
  const s = getScale(stage);
  const minX = buildings.bounds.min_x;
  const minY = buildings.bounds.min_y;
  const size = buildings.real_size[2];
  return [(x - minX) / (size * s), (y - minY) / (size * s)];
};

const MainStage: React.FC = () => {
  const realStage = useRef(null);
  const [pois, setPois] = useState<any[]>([]);
  useMount(() => {
    console.log(realStage);
    const { current } = realStage;
    const pois = getPois(current);
    setPois(pois);
    console.log(pois);
  });

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      ref={realStage}
    >
      <Layer>
        {pois.map((poi) => (
          <Poi key={poi.id} points={poi.points} />
        ))}
      </Layer>
    </Stage>
  );
};

export default MainStage;
