"use strict";

const date = document.getElementById("date");
const taskField = document.querySelector(".task-field");
const btnAdd = document.querySelector(".add");
const toDoList = document.querySelector(".todos-list");
const showModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");
const itemCount = document.getElementById("items-left");
const emptyState = document.querySelector(".empty-state");

const now = new Date();
const options = {
  day: "numeric",
  month: "short",
  weekday: "short",
  year: "numeric",
};
date.textContent = new Intl.DateTimeFormat("en-IN", options).format(now);

toDoList.innerHTML = "";
let currentTask = 0;
let taskArr = [];
let nextId = 1;

if (taskArr.length === 0) emptyState.classList.remove("hidden");

const displayTask = function(){
  taskArr.forEach(function (el) {
    const task = `
    <li class="todo" data-id="${el.id}">
    <input type="checkbox" class="checkbox" />
    <div class="task"><p>${el.text}</p></div>
    <button class="delete"><i class="fa-solid fa-x delete"></i></button>
    </li>
    `;

    toDoList.insertAdjacentHTML("beforeend", task);
  });
}



const addTask = function () {
  toDoList.innerHTML = "";

  if (taskField.value.trim() === "") {
    showModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
  }

  const todoObj = {
  id: nextId,
  text: taskField.value,
  completed: false,
}

taskArr.push(todoObj);
nextId++;

}

btnAdd.addEventListener("click", function () {
  emptyState.classList.add("hidden");
  addTask();
  displayTask();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (taskField.value.trim() === "") {
    showModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
  }
    emptyState.classList.add("hidden");
    addTask();
    displayTask();
    }
});

const closeModal = function () {
  showModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", function () {
  closeModal();
  
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

/*

// function to display all tasks

const displayTask = function () {
  taskArr.forEach(function (el) {
    const task = `
    <li class="todo">
    <input type="checkbox" class="checkbox" />
    <div class="task"><p>${el}</p></div>
    <button class="delete"><i class="fa-solid fa-x delete"></i></button>
    </li>
    `;

    toDoList.insertAdjacentHTML("beforeend", task);
  });
};

// function for adding a task

const addTask = function () {
  toDoList.innerHTML = "";

  if (taskField.value.trim() === "") {
    showModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
  }

  taskArr.push(taskField.value);

  displayTask();

  // reset input field

  taskField.value = "";
  taskField.blur();

  //  updating items left

  currentTask++;

  itemCount.textContent = `${currentTask} items left`;
};

btnAdd.addEventListener("click", function () {
  emptyState.classList.add("hidden");
  addTask();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (taskField.value.trim() === "") {
    showModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
  }
    emptyState.classList.add("hidden");
    addTask();
    }
});




document.querySelector(".todos-list").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("delete")) {
    const taskToBedelete = e.target
      .closest(".todo")
      .querySelector("p").textContent;

    const index = taskArr.findIndex((task) => task === taskToBedelete);

    taskArr.splice(index, 1);
    toDoList.innerHTML = "";

    displayTask();

    //  updating items left

    currentTask--;

    itemCount.textContent = `${currentTask} items left`;

    if (currentTask === 0) {
      emptyState.classList.remove("hidden");
    }
  }
});

*/

// document.querySelector(".todos-list").addEventListener("click", function (e) {
//   e.preventDefault();

//   if(e.target.classList.contains('checkbox')){
//     if(e.target.cheked){
//       console.log('it is checked')
//     } else {
//       console.log('Not checked');
//     }
//   }
// })