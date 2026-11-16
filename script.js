// DOM Element Selectors
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');
const taskCounter = document.getElementById('taskCounter');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// In-memory Task State Array
let tasks = [];

// Helper: Update UI Counter & Empty State
function updateUI() {
    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }

    const pendingCount = tasks.filter(t => !t.completed).length;
    taskCounter.textContent = `${pendingCount} ${pendingCount === 1 ? 'task' : 'tasks'} remaining`;
}

// Function to render all tasks
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center task-item';

        // Left Container: Checkbox and Task Text
        const leftDiv = document.createElement('div');
        leftDiv.className = 'd-flex align-items-center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input me-3';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed-task');
        }

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        // Right: Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger btn-sm';
        deleteBtn.innerHTML = '&times; Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateUI();
}

// Add New Task
function addTask(text) {
    const newTask = {
        id: Date.now(),
        text: text.trim(),
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
}

// Toggle Complete
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Event Listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value;
    if (text.trim() !== '') {
        addTask(text);
        taskInput.value = '';
        taskInput.focus();
    }
});

clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

// Initial Setup
renderTasks();
