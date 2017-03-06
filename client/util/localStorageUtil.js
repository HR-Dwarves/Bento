export function getFromLS(module, key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(module)) || {};
    } catch (e) {
      console.error(e);
    }
  }
  return ls;
}

export function saveToLS(module, key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(module, JSON.stringify({
      value
    }));
  }
}
