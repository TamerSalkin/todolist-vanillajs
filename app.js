// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addItem);
todoList.addEventListener("click", deleteItem);
filterOption.addEventListener("click", filterTodo);

// Functions
function addItem(e) {
  // Preventing of default
  e.preventDefault();
  // Creating div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Creating li
  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoDiv.appendChild(todoLi);
  todoLi.innerText = todoInput.value;
  // Save input to value
  saveLocalTodos(todoInput.value);
  // Creating check button
  const checkButton = document.createElement("button");
  todoDiv.appendChild(checkButton);
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("complete-btn");
  // Creating delete button
  const trashButton = document.createElement("button");
  todoDiv.appendChild(trashButton);
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  // Adding div to list
  todoList.appendChild(todoDiv);
  // Clear todo Input value
  todoInput.value = "";
}

function deleteItem(e) {
  const item = e.target;
  // Delete Todo
  if (e.target.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check Mark
  if (e.target.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    if (e.target.value === "all") {
      todo.style.display = "flex";
    } else if (e.target.value === "completed") {
      if (!todo.classList.contains("completed")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    } else {
      if (todo.classList.contains("completed")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    }
  });
}

function saveLocalTodos(todo) {
  // Check, do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // Check, do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating li
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);
    todoLi.innerText = todo;
    // Creating check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("complete-btn");
    todoDiv.appendChild(checkButton);
    // Creating delete button
    const trashButton = document.createElement("button");
    todoDiv.appendChild(trashButton);
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    // Adding div to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check, do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
