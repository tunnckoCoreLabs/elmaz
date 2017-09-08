const html = require('bel')

// import { elmaz, createActor, createStore, createView } from '@elmaz/elmaz'
// console.log({ elmaz, createActor, createStore, createView })

// const foobie = require('@elmaz/elmaz')
// console.log(foobie) // => { elmaz, createStore, createActor, createView }

// const { elmaz, createStore, createActor, createView } = require('@elmaz/elmaz')
// console.log({ elmaz, createStore, createActor, createView })

const { elmaz } = require('./dest/index')

const state = {
  counter: 0,
  foo: 'nothing',
}

const actions = {
  inc: ({ state, update }) => update({ counter: state.counter + 1 }),

  // overrides the state,
  // aka "hard update", so `state.foo` won't exist
  decr: ({ state, update }) => () => ({
    counter: state.counter <= 0 ? state.counter : state.counter - 1,
  }),
}

const view = ({ store: { state }, actions, emit, dispatch }) => {
  console.log('from view "state" is', state)
  // console.log(actions)
  // console.log(dispatch)

  return html`<div>
    <h1>Count: ${state.counter}</h1>
    <button onclick=${actions.inc}>+1</button>
    <button onclick=${actions.decr}>-1</button>
  </div>`
}

const app = elmaz({ state, actions, view })

app.on('error', console.log)
app.on('stateChange', (ctx) => console.log('on state change:', ctx))

document.body.appendChild(app.tree)
