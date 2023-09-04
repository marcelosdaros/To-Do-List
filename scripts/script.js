'use strict';

const taskSection = document.querySelector('.task-section')
const addTaskBtn = document.querySelector('.task-btn')
const modalEdit = document.querySelector('.modal-wrapper-edit')
const modalDeletion = document.querySelector('.modal-wrapper-deletion')
const deleteTaskBtn = document.querySelector('.confirm-deletion-btn')
const cancelDeletionBtn = document.querySelector('.cancel-deletion-btn')
const editTaskBtn = document.querySelector('.confirm-edition-btn')
const cancelEditionBtn = document.querySelector('.cancel-edition-btn')
const checkNoMsg = document.querySelector('.checkNoMsg')
const noData = document.querySelector('.no-data')
let nextTaskId = 0
let currEdition = 0
let currDeletion = 0
let hideMsg = false

const checkControl = (event) => {
  const ev = event.target
  const attributes = ev.attributes
  const nodes = ev.parentElement.childNodes

  if (ev.dataset.value === "unchecked") {
    attributes.src.value = "../images/checked.jpg"
    ev.setAttribute('data-value', 'checked')
    for (let i = 1; i <= 3; i++) {
      nodes[i].classList.toggle('checked')
    }
  } else {
    attributes.src.value = "../images/unchecked.jpg"
    ev.setAttribute('data-value', 'unchecked')
    for (let i = 1; i <= 3; i++) {
      nodes[i].classList.toggle('checked')
    }
  }
}

const processEdition = (event) => {
  const nodes = event.target.parentElement.childNodes
  const editName = document.querySelector('.edit-name-input')
  editName.placeholder = nodes[1].innerHTML

  currEdition = parseInt(event.target.parentElement.id)
  modalEdit.classList.toggle('hide')
}

const confirmEdition = (event) => {
  event.preventDefault()

  let newName = document.querySelector('.edit-name-input')
  let newPriority = document.querySelector('.edit-priority-input')
  let newDate = document.querySelector('.edit-date-input')

  if (newName.value === '') {
    alert('Task name is mandatory')
    return
  }
  if (newPriority.value === '') {
    alert('Task priority is mandatory')
    return
  }

  const taskToEdit = document.getElementById(currEdition)
  taskToEdit.childNodes[1].innerHTML = newName.value
  taskToEdit.childNodes[2].innerHTML = newPriority.value
  if (newDate.value !== '') {
    taskToEdit.childNodes[3].innerHTML = newDate.value
  }

  newName.value= ''
  newPriority.value = ''
  newDate.value = ''
  modalEdit.classList.toggle('hide')
}

const cancelEdition = (event) => {
  event.preventDefault()
  modalEdit.classList.toggle('hide')
}

const processDeletion = (event) => {
  currDeletion = parseInt(event.target.parentElement.id)
  if (!hideMsg) {
    modalDeletion.classList.toggle('hide')
  }
  else {
    confirmDeletion()
  }
}

const deleteAndHideScreen = (event) => {
  confirmDeletion()
  modalDeletion.classList.toggle('hide')
}

const confirmDeletion = () => {
  document.querySelector('.task-section').removeChild(
    document.getElementById(currDeletion)
  )
  
  for (let i = currDeletion; i < nextTaskId; i++) {
    document.getElementById(i+1).id = i
  }
  nextTaskId -= 1
  currDeletion = 0
  
  if (nextTaskId === 0) {
    noData.classList.toggle('hide')
  }
}

const cancelDeletion = (event) => {
  modalDeletion.classList.toggle('hide')
  currDeletion = 0
  hideMsg = false
  checkNoMsg.checked = false
}

const hideConfirmationMsg = (event) => {
  event.target.checked ? hideMsg = true : hideMsg = false
}

const createTaskSection = () => {
  const description = document.querySelector('#taskName').value
  const priority = document.querySelector('#taskPriority').value
  const date = document.querySelector('#taskDate').value

  const taskElement = document.createElement('section')
  taskElement.id = nextTaskId
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
  editBtn.addEventListener('click', processEdition, false)
  taskElement.appendChild(editBtn)

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'delete-btn'
  deleteBtn.innerHTML = 'Delete'
  deleteBtn.addEventListener('click', processDeletion, false)
  taskElement.appendChild(deleteBtn)

  taskSection.appendChild(taskElement)
}

const addTask = (event) => {
  event.preventDefault()

  if (document.querySelector('#taskName').value == '' || document.querySelector('#taskPriority').value == '') {
    alert('Task name and priority are required')
    return
  }

  if (nextTaskId === 0) {
    noData.classList.toggle('hide')
  }
  nextTaskId += 1
  createTaskSection()
}

addTaskBtn.addEventListener('click', addTask, false)
checkNoMsg.addEventListener('change', hideConfirmationMsg, false)
deleteTaskBtn.addEventListener('click', deleteAndHideScreen, false)
cancelDeletionBtn.addEventListener('click', cancelDeletion, false)
editTaskBtn.addEventListener('click', confirmEdition, false)
cancelEditionBtn.addEventListener('click', cancelEdition, false)

// <section class="display-task">
//   <img src="../images/unchecked.jpg" class="checkbox-img" data-value="unchecked">
//   <p class="display-name p-name">${description}</p>
//   <p class="display-priority">${priority}</p>
//   <p class="display-date">${date}</p>
//   <button class="edit-btn">Edit</button>
//   <button class="delete-btn">Delete</button>
// </section>