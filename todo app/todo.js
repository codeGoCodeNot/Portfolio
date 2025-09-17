export default class Todos {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  add(title, category) {
    this.todos.push({ title, category });
    this.save();
  }

  getAll() {
    return this.todos;
  }

  getCount() {
    return this.todos.length;
  }

  getWork() {
    return this.todos.filter((todo) => todo.category === "work");
  }

  getWorkCount() {
    return this.getWork().length;
  }

  getPersonal() {
    return this.todos.filter((todo) => todo.category === "personal");
  }

  getPersonalCount() {
    return this.getPersonal().length;
  }
  getDelete(del) {
    this.todos.splice(del, 1);
    this.save();
  }

  edit(index, newTitle, newCategory) {
    if (this.todos[index]) {
      this.todos[index].title = newTitle;
      this.todos[index].category = newCategory;
      this.save();
    }
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
