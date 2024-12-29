const apiBase = 'http://localhost:3000/tasks';

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Fetch and display tasks
const fetchTasks = async () => {
    const response = await fetch(apiBase);
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.className = `list-group-item d-flex justify-content-between align-items-center`;
        taskItem.innerHTML = `
            <span>
                <strong>${task.name}</strong> - ${task.description}
                ${task.completed ? '<span class="badge bg-success ms-2">Completed</span>' : ''}
            </span>
            <div>
                <button class="btn btn-success btn-sm me-2" onclick="completeTask(${task.id})">Complete</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
};

// Add a new task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDescription').value;

    await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
    });

    taskForm.reset();
    fetchTasks();
});

// Complete a task
const completeTask = async (id) => {
    await fetch(`${apiBase}/${id}`, { method: 'PUT' });
    fetchTasks();
};

// Delete a task
const deleteTask = async (id) => {
    await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
    fetchTasks();
};

// Initial fetch
fetchTasks();
