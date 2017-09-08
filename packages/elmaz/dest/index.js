'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createView = require('@elmaz/create-view');
var createActor = require('@elmaz/create-actor');
var createStore = require('@elmaz/create-store');

function elmaz (opts) {
  opts = Object.assign({}, opts);

  const actor = createActor(opts.actions);

  actor.connect(createStore(opts.state, opts.name));
  actor.options = opts;

  if (opts.view) {
    actor.on('render', (view, context) => view(context));
    actor.tree = createView(opts.view, actor);
  }

  return actor
}

exports.elmaz = elmaz;
exports.createActor = createActor;
exports.createStore = createStore;
exports.createView = createView;
