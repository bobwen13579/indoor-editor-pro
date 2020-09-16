import { combineReducersFromContext } from '../redux/index';
import map from './map';
/**
 * 注意这种写法是违背reducer设计思想的，虽然可以帮助开发这减少很多代码。
 * 但是引入immer和context后，它变成了命令式，不再是函数式。
 * 使用了Proxy模式后，reducer在代码层面已经不可见，最直接的影响是无对其进行单元测试了。
 * 但是为了项目进度，请接受这个善意的改造。
 */
export default combineReducersFromContext({
  map,
});
