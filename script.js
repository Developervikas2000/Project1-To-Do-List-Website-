
 // script.js
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const currentDate = document.getElementById('currentDate');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Display the current date (Month and Year)
  function updateDate() {
    const today = new Date();
    const options = { month: 'long', year: 'numeric' }; // E.g., "December 2024"
    currentDate.textContent = today.toLocaleDateString('en-US', options);
  }

  function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    tasks
      .filter(task => filter === 'all' || task.status === filter)
      .forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.status === 'completed' ? 'completed' : '';
        li.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button class="toggle-btn">${task.status === 'completed' ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
          </div>`;
        
        // Complete/Undo task
        li.querySelector('.toggle-btn').addEventListener('click', () => {
          tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
          saveAndRender();
        });

        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
          tasks.splice(index, 1);
          saveAndRender();
        });

        taskList.appendChild(li);
      });
  }

  function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, status: 'pending' });
      taskInput.value = '';
      saveAndRender();
    }
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      renderTasks(filter);
    });
  });

  // Initialize the app
  updateDate();
  renderTasks();
});
