'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var emitter = _interopDefault(require('@elmaz/emitter'));

function createActor (actions) {
  const actor = emitter();
  actor._rawActions = Object.assign({}, actions);

  actor.connect = (store) => {
    actor.store = store;

    // eslint-disable-next-line
    actor.dispatch = (actionName, aa, bb, cc) => {
      actor.actions[actionName](aa, bb, cc);
    };

    actor.actions = Object.keys(actor._rawActions).reduce((memo, name) => {
      memo[name] = function action_ (a, b, c) {
        actor.emit('action', name, a, b, c);

        const context = {
          emit: actor.emit,
          state: actor.store.state,
          actions: actor.actions,
          dispatch: actor.dispatch,
          update: (val) => (store) => Object.assign({}, store.state, val),
        };

        let result = null;

        try {
          result = actor._rawActions[name](context, a, b, c);
        } catch (er) {
          actor.emit('error', er);
        }

        // if `result` is function, action is reducer
        if (typeof result === 'function') {
          const oldState = Object.assign({}, store.state);
          // intentionally hard update the state,
          // because we provide "soft update" to each action
          store.state = store.update(result({ state: oldState }), true);

          actor.emit('stateChange', {
            prev: oldState,
            state: store.state,
          });
          return null
        }

        // otherwise, assumes action is effect
        return result
      };

      return memo
    }, {});
  };

  return actor
}

module.exports = createActor;
