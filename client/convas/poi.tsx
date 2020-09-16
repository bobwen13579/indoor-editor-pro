import React, { useRef } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Stage, Layer, Line } from 'react-konva';
import { useMount } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';

const MallSelectorProps = {
  poi: {
    id: String,
    points: [],
  },
};

const Poi: React.FC<InferProps<typeof MallSelectorProps>> = ({
  poi: { id, points },
}) => {
  const realLine = useRef(null);
  useMount(() => {
    console.log(realLine);
  });
  const line = points.flat();
  
  const scale = useSelector(state => state.map.scale);

  return (
    <Line
      id={id}
      ref={realLine}
      points={line}
      fill={'rgba(17, 101, 154, 0.1)'}
      stroke={'#806332'}
      strokeWidth={ 2 / scale}
      closed={true}
      draggable={true}
    />
  );
};

export default Poi;
