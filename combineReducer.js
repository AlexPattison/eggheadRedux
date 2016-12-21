var Redux = require('redux')

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id === action.id) {
        return Object.assign({}, state, {
          completed: !state.completed
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    )
  };
};

const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
})

const { createStore } = Redux;
const store = createStore(todoApp);

console.log('Initial state:');
console.log(store.getState());
console.log('----------------');

console.log('Dispensing ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux',
  completed: false
})
console.log('Current State:');
console.log(store.getState());
console.log('----------------');

console.log('Dispensing ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Party',
  completed: false
})
console.log('Current State:');
console.log(store.getState());
console.log('----------------');

console.log('Dispensing TOGGLE_TODO.');
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})
console.log('Current State:');
console.log(store.getState());
console.log('----------------');

console.log('Dispensing SET_VISIBILITY_FILTER.');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
console.log('Current State:');
console.log(store.getState());
console.log('----------------');
