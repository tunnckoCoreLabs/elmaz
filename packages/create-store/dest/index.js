'use strict';

function createStore (state, name) {
  state = Object.assign({}, state);

  function update (newState, hardUpdate) {
    if (!newState) {
      return null
    }

    update.state = hardUpdate
      ? Object.assign({}, newState)
      : Object.assign({}, state, newState);

    return update.state
  }

  update.update = update;
  update.state = update.state || state;
  update._name = name;
  return update
}

module.exports = createStore;
