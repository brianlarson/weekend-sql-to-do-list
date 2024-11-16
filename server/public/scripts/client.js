// Get and render todos on load
getTodos();

// Get todos list location in DOM
const todoListUl = document.getElementById("todoList");

// GET and refresh todos from db and render to DOM
function getTodos() {
  // Send Axios HTTP GET request to server
  axios({
    method: "GET",
    url: "/todos"
  })
    .then((response) => {
      // GET request and response successful so render data to DOM
      console.log("/todos GET request sent - response from server:", response.data);
      renderTodos(response.data);
  })
    .catch((error) => {
      // Log error
      console.log("/todos GET request encountered an error:", error);
  });
}

// TODO: Create function to add new todos

// TODO: Create function to toggle completed status on todos with PUT request

// TODO: Create function to delete todos from list with DELETE request

// Render todos to DOM
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
      <li id="todo-${todo.id}" class="list-group-item${liClassList}">
        <div class="row g-3">
          <div class="col-8 d-flex align-items-center">
            <input class="form-check-input mt-0" type="checkbox"${checkedAttr}>
            <label class="form-check-label" for="firstCheckbox">
              <span>${todo.text}</span>
              ${badgeHtml}
            </label>
          </div>
          <div class="col-4 d-flex justify-content-end">
            <button class="btn btn-sm btn-outline-danger">Delete</button>
          </div>
        </div>
      </li>
    `;
  }
}
