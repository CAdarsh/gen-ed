interface Map {
  [key: string]: any
}

export const deepSearchItems = (object: Map, key: string, predicate: Function): any => {
  if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) {
    return object
  }
  if (Object.keys(object).length) {
    for (let i = 0; i < Object.keys(object).length; i++) {
      let value = object[Object.keys(object)[i]];
      if (typeof value === "object" && value != null) {
        let o = deepSearchItems(object[Object.keys(object)[i]], key, predicate);
        if (o != null) {
          return o;
        }
      }
    }
  }
  return null;
}

// const findObject = (obj = {}, key, value) => {
//   const result = [];
//   const recursiveSearch = (obj = {}) => {
//      if (!obj || typeof obj !== 'object') { return;
//   };
//   if (obj[key] === value){
//      result.push(obj);
//   };
//   Object.keys(obj).forEach(function (k) {
//      recursiveSearch(obj[k]);
//   });
// } recursiveSearch(obj);
// return result;
// }
