import React, { useState } from 'react';
import Stage from '../map2d/Map';
import Map3d from '../map3d/index';
import Style from './MapIndex.less';
const Map: React.FC = () => {
  const [is3DMap, set3DMap] = useState(true);
  return (
  <>
  {is3DMap? <Stage /> : <Map3d />}
  <div className={Style.changeButton} onClick={() => {set3DMap(!is3DMap)}}>切换地图</div>
  </>);
};

export default Map;
