import _ from 'lodash';
function customizer(objValue: any, srcValue: any) {
  if (_.isObject(objValue)) {
    return srcValue;
  }
}
export const deepMerge = (target, source) => {
  const assgin = Object.assign({}, _.mergeWith(target, source, customizer));
  return assgin;
}