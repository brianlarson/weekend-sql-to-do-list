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

// Render todos to DOM
function renderTodos(todos) {
  // Clear list before re-rendering
  todoListUl.innerHTML = "";

  // Loop through todos received from database and add to DOM
  for (const todo of todos) {
    // Handle look of todo based on completed status
    let liClassList = todo.isComplete ? " bg-secondary-subtle completed": "";
    let checkedAttr = todo.isComplete ? " checked" : "";

    // Append retrieved todos to list
    todoListUl.innerHTML += `
      <li id="todo-${todo.id}" class="list-group-item${liClassList}">
        <div class="row g-3">
          <div class="col-8 d-flex align-items-center">
            <input class="form-check-input mt-0" type="checkbox"${checkedAttr}>
            <label class="form-check-label" for="firstCheckbox">
              <span>${todo.text}</span>
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
