import view from "./View.js";
import data from "./Data.js";
import Storage from "./LocalStorage.js";

class Controller {
  init() {
    const View = new view(),
      Data = new data(),
      localStorage = new Storage();

    //////////////////////////////
    //function
    const searchForATodo = () => {
      const searchedData = View.getSerchValue();
      if (searchedData) {
        const searchedList = View.checker.checked
          ? Data.searchForTodoInCompleted(searchedData)
          : Data.searchForTodoInAll(searchedData);
        View.renderSearchedData(searchedList, Data.state.completeTodos);
      } else {
        if (!View.checker.checked) {
          View.renderSearchedData(
            Data.state.listOfTodos,
            Data.state.completeTodos
          );
        } else {
          View.renderSearchedData(
            Data.state.incompletetodos,
            Data.state.completeTodos
          );
        }
      }
    };

    const getData = () => {
      if (localStorage.checkData()) {
        const data = localStorage.getData();
        Data.state.listOfTodos = data[0];
        Data.state.completeTodos = data[1];
        Data.state.incompletetodos = data[2];

        View.renderSearchedData(
          Data.state.listOfTodos,
          Data.state.completeTodos
        );
      }
    };

    /////////////////////////////////////////////////////
    // Setup Event Listiner
    View.formAdd.addEventListener("submit", e => {
      console.log(this);
      e.preventDefault();
      const value = View.getAddValue();

      if (value) {
        //1- Add todo to Data
        const todo = Data.creatTodo(value);
        //2-Add todo to View
        View.renderSingleTodo(todo);
        //3-Clear input
        View.clearAddValue();

        //4-Add to local storage
        localStorage.setData(
          Data.state.listOfTodos,
          Data.state.completeTodos,
          Data.state.incompletetodos
        );
      }
    });

    View.list.addEventListener("click", e => {
      const targetEl = e.target.closest(".list-group-item"),
        targetId = targetEl.dataset.id;
      if (targetId && e.target.tagName === "I") {
        //1-remove from Data
        Data.removeTodo(parseInt(targetId));
        //2-Remove from Ui
        View.removeSingleTodo(targetId);
        //3-remove from local storage
        localStorage.setData(
          Data.state.listOfTodos,
          Data.state.completeTodos,
          Data.state.incompletetodos
        );
      } else if (targetId && e.target.tagName === "INPUT") {
        if (e.target.checked) {
          //Add to data completed list
          Data.addtodoState(parseInt(targetId), Data.state.completeTodos);
          targetEl.querySelector("span").classList.add("completed");

          //remove from in complete
          Data.removeTodoState(parseInt(targetId), Data.state.incompletetodos);
          localStorage.setData(
            Data.state.listOfTodos,
            Data.state.completeTodos,
            Data.state.incompletetodos
          );
          if (View.checker.checked) View.removeSingleTodo(targetId);
        } else {
          // add to incomplete
          Data.addtodoState(parseInt(targetId), Data.state.incompletetodos);
          //remove from completed
          Data.removeTodoState(parseInt(targetId), Data.state.completeTodos);
          localStorage.setData(
            Data.state.listOfTodos,
            Data.state.completeTodos,
            Data.state.incompletetodos
          );
          targetEl.querySelector("span").classList.remove("completed");
        }
      }
    });

    View.formSearch.addEventListener("submit", e => {
      e.preventDefault();
      searchForATodo();
    });

    View.search.addEventListener("input", searchForATodo);

    window.addEventListener("load", getData);
    // new develop

    View.checker.addEventListener("change", e => {
      if (e.target.checked) {
        searchForATodo();
      } else {
        searchForATodo();
      }
    });
  }
}

const APP = new Controller();
APP.init();
