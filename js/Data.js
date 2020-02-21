class Todo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }
}

export default class Data {
  constructor() {
    this.state = {
      listOfTodos: [],
      completeTodos: [],
      incompletetodos: []
    };
    window.r = this.state;
  }

  creatTodo(content) {
    const id =
      this.state.listOfTodos.length > 0
        ? this.state.listOfTodos[this.state.listOfTodos.length - 1].id + 1
        : 0;
    const todo = new Todo(id, content);
    this.state.listOfTodos.push(todo);
    this.state.incompletetodos.push(todo);
    //debugger;
    return todo;
  }

  removeTodo(id) {
    this.state.listOfTodos = this.state.listOfTodos.filter(
      curr => curr.id !== id
    );
    this.state.incompletetodos = this.state.incompletetodos.filter(
      curr => curr.id !== id
    );
    this.state.completeTodos = this.state.completeTodos.filter(
      curr => curr.id !== id
    );
  }

  searchForTodoInAll(str) {
    const searchedArr = this.state.listOfTodos.filter(curr =>
      curr.content.includes(str)
    );
    return searchedArr;
  }

  searchForTodoInCompleted(str) {
    const searchedArr = this.state.incompletetodos.filter(curr =>
      curr.content.includes(str)
    );
    return searchedArr;
  }

  addtodoState(id, arr) {
    const stateTodo = this.state.listOfTodos.find(curr => curr.id === id);
    if (!arr.find(curr => curr.id === id)) {
      arr.push(stateTodo);
    }
  }

  removeTodoState(id, arr) {
    if (arr.find(curr => curr.id === id)) {
      let index = arr.findIndex(curr => curr.id === id);
      arr.splice(index, 1);
    }
  }
}
