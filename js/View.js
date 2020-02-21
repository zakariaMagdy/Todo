export default class View {
  constructor() {
    this.formSearch = document.querySelector(".search");
    this.formAdd = document.querySelector(".add");
    this.search = document.querySelector(".search").firstElementChild;
    this.add = document.querySelector(".add").lastElementChild;
    this.list = document.querySelector(".list-group");
    this.checker = document.querySelector("#complete");
  }

  getSerchValue() {
    return this.search.value.trim().toLowerCase();
  }

  getAddValue() {
    return this.add.value.trim().toLowerCase();
  }
  clearAddValue() {
    this.add.value = "";
  }

  renderSingleTodo(todo) {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-id=${todo.id}>
    <input type="checkbox" >
        <span>${todo.content}</span>
    <i class="far fa-trash-alt delete"></i>
    `;

    this.list.insertAdjacentHTML("beforeend", html);
  }

  removeSingleTodo(id) {
    document.querySelector(`[data-id="${id}"]`).remove();
  }

  renderSearchedData(arr, completed) {
    let html = "";
    arr.forEach(curr => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center 
      " data-id=${curr.id}>
      <input type="checkbox" ${
        completed.find(cur => cur.id === curr.id) ? "checked" : ""
      } >
          <span class="${
            completed.find(cur => cur.id === curr.id) ? "completed" : ""
          }">${curr.content}</span>
      <i class="far fa-trash-alt delete"></i>

          `;
    });

    this.list.innerHTML = html;
  }
}
