'use strict';

// const body = document.querySelector('body')
const taskSection = document.querySelector('.task-section')
const addTaskBtn = document.querySelector('.task-btn')
let tasks = localStorage.getItem('tasks')

if (tasks !== null) {
  taskSection.innerHTML = tasks
}

const addTask = (event) => {
  event.preventDefault()

  const description = document.querySelector('#taskName').value
  const priority = document.querySelector('#taskPriority').value
  const date = document.querySelector('#taskDate').value
  console.log(description, priority, date)

  taskSection.innerHTML = `
    <section class="display-task">
      <p class="display-name">Task Name</p>
      <p class="display-priority">Priority</p>
      <p class="display-date">Completion date</p>
      <p class="display-edition">Edit</p>
      <p class="display-deletion">Delete</p>
    </section>
    <section class="display-task">
      <p class="display-name">${description}</p>
      <p class="display-priority">${priority}</p>
      <p class="display-date">${date}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </section>`

  // if (localStorage.getItem('tasks') === null) {
  //   taskSection.innerHTML = taskDescription.innerHTML
  // } else {
  //   const taskElement = document.createElement('section')
  //   const taskDescription = document.createElement('p')
  //   taskDescription.innerHTML = document.querySelector('.task-input').value
  //   taskElement.appendChild(taskDescription)
  //   console.log(taskDescription.innerHTML)
  //   taskSection.appendChild(taskElement)
  // }
  // localStorage.setItem('tasks', taskDescription.innerHTML)
}

addTaskBtn.addEventListener('click', addTask, false)