const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// Storage class to handle localStorage
class Storage {
  // Add todoArr to localStorage
  static addTodoStorage(todoArr) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }

  // Get todoArr from localStorage
  static getStorage() {
    let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}

// Retrieve data from localStorage on page load
let todoArr = Storage.getStorage();

// Add event listener to form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;
  
  const inputValue = input.value.trim(); // Trim whitespace from the input
  
  if (inputValue !== "") {
    // Create a new todo instance
    const todo = new Todo(id, inputValue);
    // Add the todo to the array
    todoArr = [...todoArr, todo];
    // Display the updated data
    UI.displayData();
    // Clear the input field
    UI.clearInput();
    // Set up event listener for removing todos
    UI.removeTodo();
    // Update the data in localStorage
    Storage.addTodoStorage(todoArr);
  } else {
    // Display alert message for empty input
    alert("Please enter a todo before adding to the list.");
  }
});

// Todo class to create todo objects
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

// UI class to handle user interface interactions
class UI {
  // Display the data in the UI
  static displayData() {
    let template = todoArr.map((item) => {
      return `
        <div class="todo">
          <p>${item.todo}</p>
          <span class="pointer" data-id=${item.id}><i class="fa-sharp fa-solid fa-trash"></i></span>
        </div>
      `;
    });
    lists.innerHTML = template.join(" ");
  }

  // Clear the input field
  static clearInput() {
    input.value = "";
  }

  // Set up event listener for removing todos
  static removeTodo() {
    lists.addEventListener("click", (e) => {
      const clickedElement = e.target.closest(".pointer");
      if (clickedElement) {
        const todoElement = clickedElement.closest(".todo");
        if (todoElement) {
          todoElement.remove();
          let btnId = clickedElement.dataset.id;
          UI.removeArrayTodo(btnId);
        }
      }
    });
  }

  // Remove a todo from the array
  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
    // Update the data in localStorage
    Storage.addTodoStorage(todoArr);
  }
}

// Event listener for DOMContentLoaded event
window.addEventListener("DOMContentLoaded", () => {
  // Display the data in the UI
  UI.displayData();
  // Set up event listener for removing todos
  UI.removeTodo();
});
