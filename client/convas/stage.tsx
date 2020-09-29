import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { useMount } from 'react-use';
import { useDebouncedCallback } from 'use-debounce';
import buildings from '../mock/building.json';
import Poi from './poi';
import { useSelector, useDispatch } from 'react-redux';
import { ReactReduxContext, Provider } from 'react-redux';

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

const getStagePosition = (newScale: number, stage: any) => {
  const oldScale = stage.scaleX();
  let pointX = 0;
  let pointY = 0;
  const isPointer = !!stage.getPointerPosition();
  if (isPointer) {
    pointX = stage.getPointerPosition().x;
    pointY = stage.getPointerPosition().y;
  } else {
    pointX = stage.width() * 0.5;
    pointY = stage.height() * 0.5;
  }

  const mousePointTo = {
    x: pointX / oldScale - stage.x() / oldScale,
    y: pointY / oldScale - stage.y() / oldScale,
  };

  return {
    x: -(mousePointTo.x - pointX / newScale) * newScale,
    y: -(mousePointTo.y - pointY / newScale) * newScale,
  };
};

const MAX_SCALE = 80;
const MIN_SCALE = 0.1;

const MainStage: React.FC = () => {
  const realStage = useRef(null);
  const [pois, setPois] = useState<any[]>([]);
  // const store = useSelector((state) => state);
  // const store = useSelector((state) => state);
  // const dispatch = useDispatch();
  const [scale, setScale] = useState(1)
  // const [debouncedCallback] = useDebouncedCallback(
  //   // function
  //   ({ x, y, scale }) => {
  //     const { current: stage } = realStage;
  //     stage.to({
  //       x,
  //       y,
  //       scaleX: scale,
  //       scaleY: scale,
  //     });
  //     // setScale(scale)
  //     // dispatch({ type: 'changeScale', scale });
  //   },
  //   // delay in ms
  //   10
  // );
  useMount(() => {
    const { current } = realStage;
    // registerWheelEvent(current);
    const pois = getPois(current);
    setPois(pois);
  });
  const scaleMap = (e: any) => {
    const { currentTarget: stage, evt } = e;
    evt.preventDefault();
    const oldScale = stage.scaleX();
    if (oldScale < MIN_SCALE && evt.deltaY > 0) return;
    if (oldScale > MAX_SCALE && evt.deltaY < 0) return;
    const newScale = evt.deltaY < 0 ? oldScale / 0.5 : oldScale * 0.5;
    const {x,y } = getStagePosition(newScale, stage);
    stage.to({
      x,
      y,
      scaleX: newScale,
      scaleY: newScale,
    });
    console.log(newScale)
    setScale(newScale)
  };
  return (
    // <ReactReduxContext.Consumer>
    //   {({ store }) => (
    //     <Stage
    //       width={window.innerWidth}
    //       height={window.innerHeight}
    //       ref={realStage}
    //       draggable={true}
    //       onWheel={scaleMap}
    //     >
    //       <Provider store={store}>
    //         <Layer>
    //           {pois.map((poi) => (
    //             <Poi key={poi.id} poi={poi} />
    //           ))}
    //         </Layer>
    //       </Provider>
    //     </Stage>
    //   )}
    // </ReactReduxContext.Consumer>
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      ref={realStage}
      draggable={true}
      onWheel={scaleMap}
    >
      <Layer>
        {pois.map((poi) => (
          <Poi key={poi.id} poi={poi} scale={scale}/>
        ))}
      </Layer>
    </Stage>
  );
};

export default MainStage;
