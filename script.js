const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
    li.dataset.id = task.id;

    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn" data-id="${task.id}">Remover</button>
    `;
    todoList.appendChild(li);
  });
}


todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  todoInput.value = '';
});

todoList.addEventListener('click', function (event) {
  const target = event.target;
  const taskId = parseInt(target.dataset.id || target.closest('li').dataset.id);

  if (target.classList.contains('delete-btn')) {
    tasks = tasks.filter(task => task.id !== taskId);
  } else {
    const task = tasks.find(task => task.id === taskId);
    if (task) task.completed = !task.completed;
  }

  saveTasks();
  renderTasks();
});


renderTasks();
