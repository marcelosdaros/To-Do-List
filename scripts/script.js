'use strict';

// const body = document.querySelector('body')
const taskSection = document.querySelector('.task-section')
const addTaskBtn = document.querySelector('.task-btn')

const checkControl = (event) => {
  const checkbox = document.querySelector(".checkbox-img")
  const taskName = document.querySelector('.p-name')
  console.log(taskName)

  if (event.target.dataset.value === "unchecked") {
    checkbox.src = "../images/checked.jpg"
    checkbox.setAttribute('data-value', "checked")
    taskName.className = "display-name p-name checked"
  } else {
    checkbox.src = "../images/unchecked.jpg"
    checkbox.setAttribute('data-value', "unchecked")
    taskName.className = "display-name p-name"
  }
}

const addTask = (event) => {
  event.preventDefault()

  const description = document.querySelector('#taskName').value
  const priority = document.querySelector('#taskPriority').value
  const date = document.querySelector('#taskDate').value
  console.log(description, priority, date)

  if (localStorage.getItem('tasks') === null) {
    taskSection.innerHTML = `
      <section class="display-titles">
        <p class="checkbox-space"></p>
        <p class="display-name">Task Name</p>
        <p class="display-priority">Priority</p>
        <p class="display-date">Completion date</p>
        <p class="display-edition">Edit</p>
        <p class="display-deletion">Delete</p>
      </section>
      <section class="display-task">
        <img src="../images/unchecked.jpg" class="checkbox-img" data-value="unchecked">
        <p class="display-name p-name">${description}</p>
        <p class="display-priority">${priority}</p>
        <p class="display-date">${date}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </section>`
  }
  // else {
  //   const taskElement = document.createElement('section')
  //   const taskDescription = document.createElement('p')
  //   taskDescription.innerHTML = document.querySelector('.task-input').value
  //   taskElement.appendChild(taskDescription)
  //   console.log(taskDescription.innerHTML)
  //   taskSection.appendChild(taskElement)
  // }
  // localStorage.setItem('tasks', taskDescription.innerHTML)

  const task = document.querySelector('.checkbox-img')
  task.addEventListener("click", checkControl, false)
}

addTaskBtn.addEventListener('click', addTask, false)