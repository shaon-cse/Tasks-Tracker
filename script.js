document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const filterOptions = document.getElementById('filter-options');
    const clearCompletedBtn = document.getElementById('clear-completed');
  
    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTask(newTaskInput.value);
      newTaskInput.value = '';
    });
  
    taskList.addEventListener('click', function (event) {
      const target = event.target;
      if (target.classList.contains('complete-btn')) {
        toggleTaskStatus(target.closest('.task-item'));
      } else if (target.classList.contains('delete-btn')) {
        deleteTask(target.closest('.task-item'));
      } else if (target.classList.contains('edit-btn')) {
        editTask(target.closest('.task-item'));
      } else if (target.classList.contains('update-btn')) {
        updateTask(target.closest('.task-item'));
      }
    });
  
    filterOptions.addEventListener('change', filterTasks);
  
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
  
    loadTasksFromLocalStorage();
  
    function addTask(taskText) {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="btn-group">
          <button class="edit-btn">Edit</button>
          <button class="complete-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
      saveTasksToLocalStorage();
    }
  
    function toggleTaskStatus(taskItem) {
      taskItem.classList.toggle('completed');
      saveTasksToLocalStorage();
    }
  
    function deleteTask(taskItem) {
      taskList.removeChild(taskItem);
      saveTasksToLocalStorage();
    }
  
    function editTask(taskItem) {
      const taskText = taskItem.querySelector('.task-text');
      const btnGroup = taskItem.querySelector('.btn-group');
  
      taskText.contentEditable = true;
      taskText.focus();
      btnGroup.innerHTML = `
        <button class="update-btn">Update</button>
        <button class="cancel-btn">Cancel</button>
      `;
    }
  
    function updateTask(taskItem) {
      const taskText = taskItem.querySelector('.task-text');
      const btnGroup = taskItem.querySelector('.btn-group');
  
      taskText.contentEditable = false;
      btnGroup.innerHTML = `
        <button class="edit-btn">Edit</button>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
      `;
  
      saveTasksToLocalStorage();
    }
  
    function filterTasks() {
      const filterValue = filterOptions.value;
      const taskItems = document.querySelectorAll('.task-item');
  
      taskItems.forEach(taskItem => {
        if (filterValue === 'all' || (filterValue === 'active' && !taskItem.classList.contains('completed')) || (filterValue === 'completed' && taskItem.classList.contains('completed'))) {
          taskItem.style.display = 'flex';
        } else {
          taskItem.style.display = 'none';
        }
      });
    }
  
    function clearCompletedTasks() {
      const completedTasks = document.querySelectorAll('.task-item.completed');
      completedTasks.forEach(taskItem => taskList.removeChild(taskItem));
      saveTasksToLocalStorage();
    }
  
    function saveTasksToLocalStorage() {
      const tasks = [];
      const taskItems = document.querySelectorAll('.task-item');
  
      taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
      });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasksFromLocalStorage() {
      const storedTasks = localStorage.getItem('tasks');
  
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => addTaskFromLocalStorage(task.text, task.completed));
      }
    }
  
    function addTaskFromLocalStorage(taskText, isCompleted) {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      if (isCompleted) {
        taskItem.classList.add('completed');
      }
      taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="btn-group">
          <button class="edit-btn">Edit</button>
          <button class="complete-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    }
  });
  