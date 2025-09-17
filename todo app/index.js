import Todos from "./todo.js";

const form = document.querySelector(".todo-form");
const title = document.querySelector("#todo-title");
const category = document.querySelector("#todo-category");
const filter = document.querySelector("#todo-filter");
const count = document.querySelector("#todo-count");
const list = document.querySelector("#todo-list");

const todos = new Todos();
let editingIndex = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  todos.add(title.value, category.value);
  render(todos.getAll(), todos.getCount());
  title.value = "";
});

filter.addEventListener("change", () => {
  if (filter.value === "work") {
    render(todos.getWork(), todos.getWorkCount());
  } else if (filter.value === "personal") {
    render(todos.getPersonal(), todos.getPersonalCount());
  } else {
    render(todos.getAll(), todos.getCount());
  }
});

list.addEventListener("click", (e) => {
  if (e.target.dataset.del) {
    todos.getDelete(e.target.dataset.del);
    render(todos.getAll(), todos.getCount());
  }

  if (e.target.dataset.edit) {
    editingIndex = +e.target.dataset.edit;
    render(todos.getAll(), todos.getCount());
  }

  if (e.target.closest(".done-btn")) {
    const index = e.target.closest(".done-btn").dataset.done;
    const editInput = list.querySelector(`.edit-input[data-index="${index}"]`);
    if (editInput) {
      const newTitle = editInput.value;
      const newCategory = todos.getAll()[index].category;
      todos.edit(index, newTitle, newCategory);
      editingIndex = null;
      render(todos.getAll(), todos.getCount());
    }
  }

  if (e.target.closest(".cancel-btn")) {
    editingIndex = null;
    render(todos.getAll(), todos.getCount());
  }
});

// handle editing when user presses Enter in the input
list.addEventListener("keydown", (e) => {
  if (e.target.classList.contains("edit-input") && e.key === "Enter") {
    const index = +e.target.dataset.index;
    const newTitle = e.target.value;
    const newCategory = todos.getAll()[index].category;
    todos.edit(index, newTitle, newCategory);
    editingIndex = null;
    render(todos.getAll(), todos.getCount());
  }

  if (e.target.classList.contains("edit-input") && e.key === "Escape") {
    editingIndex = null;
    render(todos.getAll(), todos.getCount());
  }
});

const render = (items, itemsCount) => {
  count.textContent = `${itemsCount}`;
  list.innerHTML = items
    .map((todo, index) => {
      if (editingIndex === index) {
        return `<li>
            <li>
            <div class="edit-row">
                 <input class="edit-input" type="text" value="${todo.title}" data-index="${index}">
                <button class="btn done-btn" data-done="${index}">Done</button>
                <button class="btn cancel-btn" data-cancel="${index}">Cancel</button>
            </div>
            </li>

            </li>`;
      }
      // Normal display
      return `<li>
        <span>${todo.title}</span>
        <button class="edit-btn" data-edit="${index}">
        <i class="fa fa-pencil" data-edit="${index}"></i>
        </button>
        <button class="delete-btn" data-del="${index}">x</button>
      </li>`;
    })
    .join("");
};

render(todos.getAll(), todos.getCount());
