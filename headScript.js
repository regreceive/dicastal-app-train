(function () {
  try {
    window.document.domain = window.location.host
      .split('.')
      .slice(-2)
      .join('.')
      .split(':')[0];
  } catch (er) {
    console.warn('domain设置失败。');
  }

  window.$$K2RootWindow = getRootWindow(window);

  function getRootWindow(win) {
    try {
      if (win.parent === win) return win;
      if (win.parent['$$_K2_SDK']) return win.parent;
      return getRootWindow(win.parent);
    } catch (error) {
      return window;
    }
  }
})();
