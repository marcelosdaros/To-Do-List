'use strict';

const taskSection = document.querySelector('.display-tasks')
const addTaskBtn = document.querySelector('.task-btn')
const modalDeletion = document.querySelector('.modal-wrapper-deletion')
const deleteTaskBtn = document.querySelector('.confirm-deletion-btn')
const cancelDeletionBtn = document.querySelector('.cancel-deletion-btn')
const modalEdit = document.querySelector('.modal-wrapper-edit')
const editTaskBtn = document.querySelector('.confirm-edition-btn')
const cancelEditionBtn = document.querySelector('.cancel-edition-btn')
const checkNoMsg = document.querySelector('.checkNoMsg')
const noData = document.querySelector('.no-data')
const sortCheckMark = document.querySelector('.checkbox-space')
const sortPName = document.querySelector('.p-name')
const sortImgName = document.querySelector('.sort-btn-name')
const sortPriority = document.querySelector('.display-priority')
const sortDate = document.querySelector('.display-date')
let nextTaskId = 0
let currentEditionID = 0
let currDeletion = 0
let hideMsg = false
let tasks = []

const createTaskSection = (task) => {
  const taskElement = document.createElement('section')
  taskElement.id = task.id
  taskElement.className = 'display-task'

  const image = document.createElement('img')
  image.src = `../images/${task.checkStatus}.jpg`
  image.className = 'checkbox-img'
  image.setAttribute('data-value', `${task.checkStatus}`)
  image.addEventListener('click', checkControl, false)
  taskElement.appendChild(image)

  const taskName = document.createElement('p')
  taskName.className = `display-name ${task.checkStatus}`
  taskName.innerHTML = task.name
  taskElement.appendChild(taskName)

  const taskPriority = document.createElement('p')
  taskPriority.className = `display-priority ${task.checkStatus}`
  taskPriority.innerHTML = task.priority
  taskElement.appendChild(taskPriority)

  const taskDate = document.createElement('p')
  taskDate.className = `display-date ${task.checkStatus}`
  taskDate.innerHTML = task.date
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

  const task = {
    id: nextTaskId,
    checkStatus: 'unchecked',
    name: document.querySelector('#taskName').value,
    priority: document.querySelector('#taskPriority').value,
    date: document.querySelector('#taskDate').value
  }
  tasks.push(task)
  createTaskSection(task)
}

const processEdition = (event) => {
  const nodes = event.target.parentElement.childNodes
  const editName = document.querySelector('.edit-name-input')
  editName.placeholder = nodes[1].innerHTML

  currentEditionID = parseInt(event.target.parentElement.id)
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

  const taskToEdit = document.getElementById(currentEditionID)
  taskToEdit.childNodes[1].innerHTML = newName.value
  taskToEdit.childNodes[2].innerHTML = newPriority.value
  if (newDate.value !== '') {
    taskToEdit.childNodes[3].innerHTML = newDate.value
  }

  const idFromTasksArray = currentEditionID-1
  tasks[idFromTasksArray].name = newName.value
  tasks[idFromTasksArray].priority = newPriority.value
  tasks[idFromTasksArray].date = newDate.value

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

const deleteAndHideScreen = () => {
  confirmDeletion()
  modalDeletion.classList.toggle('hide')
}

const confirmDeletion = () => {
  document.querySelector('.display-tasks').removeChild(
    document.getElementById(currDeletion)
  )
  
  tasks.splice(currDeletion-1, 1)
  for (let i = currDeletion; i < nextTaskId; i++) {
    document.getElementById(i+1).id = i
    tasks[i-1].id = i
  }

  nextTaskId -= 1
  currDeletion = 0

  if (nextTaskId === 0) {
    console.log('test')
    noData.classList.toggle('hide')
  }
}

const cancelDeletion = () => {
  modalDeletion.classList.toggle('hide')
  currDeletion = 0
  hideMsg = false
  checkNoMsg.checked = false
}

const hideConfirmationMsg = (event) => {
  event.target.checked ? hideMsg = true : hideMsg = false
}

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
    tasks.find((element) => element.id == ev.parentElement.id).checkStatus = 'checked'
  }
  else {
    attributes.src.value = "../images/unchecked.jpg"
    ev.setAttribute('data-value', 'unchecked')
    for (let i = 1; i <= 3; i++) {
      nodes[i].classList.toggle('checked')
    }
    tasks.find((element) => element.id == ev.parentElement.id).checkStatus = 'unchecked'
  }
}

const sortAnimation = (operation) => {
  let targetElement = undefined
  let targetBtn = undefined

  switch (operation) {
    case 'check':
      targetElement = document.querySelector('.checkbox-space')
      targetBtn = '.sort-btn-checked'
      break
    case 'name':
      targetElement = document.querySelector('.display-name')
      targetBtn = '.sort-btn-name'
      break
    case 'priority':
      targetElement = document.querySelector('.display-priority')
      targetBtn = '.sort-btn-priority'
      break
    case 'date':
      targetElement = document.querySelector('.display-date')
      targetBtn = '.sort-btn-date'
      break
    default:
      return
  }

  if (targetElement.dataset.arrowdown === 'true') {
    document.querySelector(targetBtn).attributes.src.value = "/images/arrow_up.jpg"
    targetElement.setAttribute("data-arrowdown", "false")
  }
  else {
    document.querySelector(targetBtn).attributes.src.value = "/images/arrow_down.jpg"
    targetElement.setAttribute("data-arrowdown", "true")
  }
}

const sortByCheckMark = () => {
  sortAnimation('check')

  if (document.querySelector('.checkbox-space').dataset.arrowdown === 'true') {
    tasks.sort((a, b) => {
      if (a.checkStatus < b.checkStatus) {
        return 1
      }
      if (a.checkStatus > b.checkStatus) {
        return -1
      }
      return 0
    })
  }
  else {
    tasks.sort((a, b) => {
      if (a.checkStatus < b.checkStatus) {
        return -1
      }
      if (a.checkStatus > b.checkStatus) {
        return 1
      }
      return 0
    })
  }

  adjustTaskIds()
  recreateTasks()
}

const sortByName = () => {
  sortAnimation('name')

  if (document.querySelector('.display-name').dataset.arrowdown === 'true') {
    tasks.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  }
  else {
    tasks.sort((a, b) => {
      if (a.name < b.name) {
        return 1
      }
      if (a.name > b.name) {
        return -1
      }
      return 0
    })
  }

  adjustTaskIds()
  recreateTasks()
}

const sortByPriority = () => {
  sortAnimation('priority')

  if (document.querySelector('.display-priority').dataset.arrowdown === 'true') {
    tasks.sort((a, b) => {
      if (a.priority < b.priority) {
        return -1
      }
      if (a.priority > b.priority) {
        return 1
      }
      return 0
    })
  }
  else {
    tasks.sort((a, b) => {
      if (a.priority < b.priority) {
        return 1
      }
      if (a.priority > b.priority) {
        return -1
      }
      return 0
    })
  }

  adjustTaskIds()
  recreateTasks()
}

const sortByDate = () => {
  sortAnimation('date')

  if (document.querySelector('.display-date').dataset.arrowdown === 'true') {
    tasks.sort((a, b) => {
      if (a.date < b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    })
  }
  else {
    tasks.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      }
      if (a.date > b.date) {
        return -1
      }
      return 0
    })
  }

  adjustTaskIds()
  recreateTasks()
}

const adjustTaskIds = () => {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].id = i+1
  }
}

const recreateTasks = () => {
  taskSection.innerHTML = ''
  tasks.forEach(task => createTaskSection(task))
}

addTaskBtn.addEventListener('click', addTask, false)
checkNoMsg.addEventListener('change', hideConfirmationMsg, false)
deleteTaskBtn.addEventListener('click', deleteAndHideScreen, false)
cancelDeletionBtn.addEventListener('click', cancelDeletion, false)
editTaskBtn.addEventListener('click', confirmEdition, false)
cancelEditionBtn.addEventListener('click', cancelEdition, false)
sortCheckMark.addEventListener('click', sortByCheckMark, false)
sortPName.addEventListener('click', sortByName, false)
sortImgName.addEventListener('click', sortByName, false)
sortPriority.addEventListener('click', sortByPriority, false)
sortDate.addEventListener('click', sortByDate, false)