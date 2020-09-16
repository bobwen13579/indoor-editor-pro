/* eslint-disable no-param-reassign */
import { Context } from '../helper/redux_helper';

// define model
interface State {
  selPoi: string;
  scale: number
}

// 使用
const context: Context<State> = {
  initState: {
    selPoi: '',
    scale: 1,
  },
  actions: {
    selectPoi: (draft, { poiId }) => {
      draft.selPoi = poiId;
    },
    changeScale: (draft, { scale }) => {
      draft.scale = scale;
    },
  },
};

export default context;
