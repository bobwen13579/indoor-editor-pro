import React, { useRef } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Stage, Layer, Line } from 'react-konva';
import { useMount } from 'react-use';

const MallSelectorProps = {
  points: [],
};

const Poi: React.FC<InferProps<typeof MallSelectorProps>> = ({ points }) => {
  const realLine = useRef(null);
  useMount(() => {
    console.log(realLine);
  });
  const line = points.flat();
  console.log(realLine);
  return (
    <Line
      ref={realLine}
      points={line}
      fill={'rgba(17, 101, 154, 0.1)'}
      stroke={'#806332'}
      strokeWidth={5}
      closed={true}
    />
  );
};

export default Poi;
