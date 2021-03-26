// @ts-nocheck
import { createHashHistory } from 'umi/node_modules/@umijs/runtime';

let options = {
  basename: '/',
};

if ((<any>window).routerBase) {
  options.basename = (<any>window).routerBase;
}

// 直接赋值给history。否则import导入的history会是自带的而不是替换过的history
let history = wrapHistory(createHashHistory(options));

export function createHistory() {
  return history;
}

function wrapHistory(history) {
  window.$$k2App = {
    replace: history.replace,
    push: history.push,
  };

  let nextHistory = window.$$K2RootWindow?.$$_K2_SDK?.lib.utils.getHistory(
    window,
    history,
  );
  if (nextHistory) {
    console.log('接管history');
  } else {
    nextHistory = history;
  }

  window.$$history = nextHistory;
  return nextHistory;
}

export { history };
