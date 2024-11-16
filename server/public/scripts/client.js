// Get and render todos on load
getTodos();

// Get todos list location and todo text input
const todoListUl = document.getElementById("todoList");
const todoTextInput = document.getElementById("todoText");

// Make GET HTTP request to retrieve todos from db and render them
function getTodos() {

  // Send Axios HTTP GET request to server
  axios({
    method: "GET",
    url: "/todos"
  })
    .then((response) => {
      // GET request and response successful so render data to DOM
      // console.log("/todos GET request sent - response from server:", response.data);
      renderTodos(response.data);
  })
    .catch((error) => {
      // Log error
      console.log("/todos GET request encountered an error:", error);
  });

}

// Make POST HTTP request to add a new todo, refresh from db and re-render
function addTodo(event) {

  // Prevent button in form from refreshing page
  event.preventDefault();

  // Send Axios HTTP POST request to server
  axios({
    method: "POST",
    url: "/todos",
    data: { text: todoTextInput.value }
  })
    .then((response) => {
      // GET request and response successful so get updated todos and re-render to DOM
      // console.log("/todos GET request sent - response from server:", response.data);
      getTodos();
  })
    .catch((error) => {
      // Log error
      console.log("/todos GET request encountered an error:", error);
  });

  // Clear the todo text input
  todoTextInput.value = ``;

}

// TODO: Create function to toggle completed status on todos with PUT request

// Make DELETE HTTP request to delete todo, refresh from db and re-render
function deleteTodo(todoId) {

  // Send Axios HTTP DELETE request to server
  axios({
    method: "DELETE",
    url: "/todos",
    data: { id: todoId }
  })
    .then((response) => {
      // DELETE request and response successful so get updated todos and re-render to DOM
      // console.log("/todos DELETE request sent - response from server:", response.data);
      getTodos();
  })
    .catch((error) => {
      // Log error
      console.log("/todos DELETE request encountered an error:", error);
  });

}

// Render todos
function renderTodos(todos) {

  // Clear list before re-rendering
  todoListUl.innerHTML = "";

  // Loop through todos received from database and add to DOM
  for (const todo of todos) {

    // Handle look of todo based on completed status
    const liClassList = todo.isComplete ? ` bg-transparent fst-italic text-secondary completed`: ` bg-dark-subtle`;
    const checkedAttr = todo.isComplete ? ` checked` : ``;
    const badgeHtml = todo.isComplete ? `<span class="badge rounded-pill text-bg-success fst-normal fw-light">Completed</span>` : ``;

    // Append retrieved todos to list
    todoListUl.innerHTML += `
      <li class="list-group-item${liClassList}" data-testid="toDoItem">
        <div class="row g-3">
          <div class="col-8 d-flex align-items-center">
            <input class="form-check-input mt-0" type="checkbox" data-testid="completeButton"${checkedAttr}>
            <label class="form-check-label" for="firstCheckbox">
              <span>${todo.text}</span>
              ${badgeHtml}
            </label>
          </div>
          <div class="col-4 d-flex justify-content-end">
            <button onclick="deleteTodo(${todo.id})" class="btn btn-sm btn-outline-danger" data-testid="deleteButton">Delete</button>
          </div>
        </div>
      </li>
    `;

  }
}
