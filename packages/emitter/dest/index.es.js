function emitter (events) {
  events = Object.assign({}, events);

  const app = {
    events,
    on (name, listener) {
      (events[name] || (events[name] = [])).push(listener);
    },

    off (name, listener) {
      if (events[name] && listener) {
        events[name].splice(events[name].indexOf(listener) >>> 0, 1);
      } else if (name && !listener) {
        app.events[name] = events[name] = [];
      } else {
        app.events = events = {};
      }
    },

    // eslint-disable-next-line
    emit(name, a, b, c) {
      (events[name] || []).map((listener) => {
        listener(a, b, c);
      })
      ;(events['*'] || []).map((listener) => {
        listener(name, a, b, c);
      });
    },

    use (plugin) {
      return Object.assign({}, app, plugin(app))
    },
  };

  return app
}

export default emitter;
