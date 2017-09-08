import createView from '@elmaz/create-view'
import createActor from '@elmaz/create-actor'
import createStore from '@elmaz/create-store'

function elmaz (opts) {
  opts = Object.assign({}, opts)

  const actor = createActor(opts.actions)

  actor.connect(createStore(opts.state, opts.name))
  actor.options = opts

  if (opts.view) {
    actor.on('render', (view, context) => view(context))
    actor.tree = createView(opts.view, actor)
  }

  return actor
}

export { elmaz, createActor, createStore, createView }
