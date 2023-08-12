'use strict';

const taskSection = document.querySelector('.task-section')
const addTaskBtn = document.querySelector('.task-btn')

const checkControl = (event) => {
  const ev = event.target
  const attributes = ev.attributes
  const nodes = ev.parentElement.childNodes

  if (ev.dataset.value === "unchecked") {
    attributes.src.value = "../images/checked.jpg"
    ev.setAttribute('data-value', 'checked')
    for (let i = 0; i <= 3; i++) {
      nodes[i].className += ' checked'
    }
  } else {
    attributes.src.value = "../images/unchecked.jpg"
    ev.setAttribute('data-value', 'unchecked')
    for (let i = 0; i <= 3; i++) {
      const newClass = nodes[i].className.replace(' checked', '')
      nodes[i].className = newClass
    }
  }
}

const createTaskSection = () => {
  const description = document.querySelector('#taskName').value
  const priority = document.querySelector('#taskPriority').value
  const date = document.querySelector('#taskDate').value

  const taskElement = document.createElement('section')
  taskElement.className = 'display-task'

  const image = document.createElement('img')
  image.src = '../images/unchecked.jpg'
  image.className = 'checkbox-img'
  image.setAttribute('data-value', 'unchecked')
  image.addEventListener('click', checkControl, false)
  taskElement.appendChild(image)

  const taskName = document.createElement('p')
  taskName.className = 'display-name'
  taskName.innerHTML = description
  taskElement.appendChild(taskName)

  const taskPriority = document.createElement('p')
  taskPriority.className = 'display-priority'
  taskPriority.innerHTML = priority
  taskElement.appendChild(taskPriority)

  const taskDate = document.createElement('p')
  taskDate.className = 'display-date'
  taskDate.innerHTML = date
  taskElement.appendChild(taskDate)

  const editBtn = document.createElement('button')
  editBtn.className = 'edit-btn'
  editBtn.innerHTML = 'Edit'
  taskElement.appendChild(editBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'delete-btn'
  deleteBtn.innerHTML = 'Delete'
  taskElement.appendChild(deleteBtn)

  taskSection.appendChild(taskElement)
}

const addTask = (event) => {
  event.preventDefault()

  if (localStorage.getItem('tasks') === null) {
    taskSection.innerHTML = `
      <section class="display-titles">
        <p class="checkbox-space"></p>
        <p class="display-name">Task Name</p>
        <p class="display-priority">Priority</p>
        <p class="display-date">Completion date</p>
        <p class="display-edition">Edit</p>
        <p class="display-deletion">Delete</p>
      </section>`;
  }
  createTaskSection()
  localStorage.setItem('tasks', 'not null')
}

addTaskBtn.addEventListener('click', addTask, false)

// <section class="display-task">
//   <img src="../images/unchecked.jpg" class="checkbox-img" data-value="unchecked">
//   <p class="display-name p-name">${description}</p>
//   <p class="display-priority">${priority}</p>
//   <p class="display-date">${date}</p>
//   <button class="edit-btn">Edit</button>
//   <button class="delete-btn">Delete</button>
// </section>