const expect = require('expect')
const deepfreeze = require('deepfreeze')

const toggleTodo = (todo) => {
  return Object.assign({}, todo, {
    completed: !todo.completed
  })
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Finish Course',
    completed: false
  }

  const todoAfter = {
    id: 0,
    text: 'Finish Course',
    completed: true
  }

  deepfreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)
}

testToggleTodo();
console.log('All tests are passing');
