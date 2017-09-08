'use strict';

function createView (viewFn, actor) {
  let context = {
    emit: actor.emit,
    store: actor.store,
    actions: actor.actions,
    dispatch: actor.dispatch,
  };

  let el = null;
  let view = (a, b, c) => (el = viewFn(a, b, c));

  actor.off('stateChange');
  actor.on('stateChange', (ctx) => {
    context = Object.assign({}, context, ctx);
    actor.emit('render', view, context, el);
  });
  actor.emit('render', view, context, el);

  return el
}

module.exports = createView;
