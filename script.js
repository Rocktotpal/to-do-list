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
const filters = document.querySelector(".filters");
const filterBtn = document.querySelectorAll(".filter");
const clearCompleted = document.getElementById("clear-completed");

const now = new Date();
const options = {
  day: "numeric",
  month: "short",
  weekday: "short",
  year: "numeric",
};
date.textContent = new Intl.DateTimeFormat("en-IN", options).format(now);

toDoList.innerHTML = "";
showModal.classList.remove("open");
let taskArr = [];
let nextId = 1;
let currentFilter = "all";

if (taskArr.length === 0) emptyState.classList.remove("hidden");

// Task creation

const createTask = function (el) {
  // Refactored 1: avoid repeated HTML

  const checkboxDecider =
    el.completed === false ? `class="checkbox"` : `class="checkbox" checked`;
  const decider = el.completed === false ? "<p>" : '<p class="task-completed">';
  const task = `
     <li class="todo" data-id="${el.id}">
      <label class="checkbox-container">
        <input type="checkbox" ${checkboxDecider} />
        <span class="checkmark"></span>
      </label>
      <div class="task">${decider}${el.text}</p></div>
      <button class="delete"><i class="fa-solid fa-x delete"></i></button>
     </li>`;

  toDoList.insertAdjacentHTML("beforeend", task);
};

// Empty state handling functions

const showEmptyState = function () {
  emptyState.classList.remove("hidden");
};

const closeEmptyState = function () {
  emptyState.classList.add("hidden");
};

// Task Display function

const displayTask = function () {
  toDoList.innerHTML = "";

  const activeTasks = taskArr.filter((task) => task.completed === false);
  const completedTasks = taskArr.filter((task) => task.completed === true);

  if (currentFilter === "all") {
    taskArr.length === 0 ? showEmptyState() : closeEmptyState();
    taskArr.forEach((el) => createTask(el));
  } else if (currentFilter === "active") {
    activeTasks.length === 0 ? showEmptyState() : closeEmptyState();
    activeTasks.forEach((el) => createTask(el));
  } else if (currentFilter === "completed") {
    completedTasks.length === 0 ? showEmptyState() : closeEmptyState();
    completedTasks.forEach((el) => createTask(el));
  }

  const decider = activeTasks.length > 1 ? "items" : "item";
  itemCount.textContent = `${activeTasks.length} ${decider} left`;
};

// Task addition

const addTask = function () {
  if (taskField.value.trim() === "") {
    showModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
  }

  const todoObj = {
    id: nextId,
    text: taskField.value,
    completed: false,
  };

  taskArr.push(todoObj);
  nextId++;
};

btnAdd.addEventListener("click", function () {
  closeEmptyState();
  addTask();
  displayTask();

  taskField.value = "";
  taskField.blur();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (taskField.value.trim() === "") {
      showModal.classList.add("open");
      overlay.classList.remove("hidden");
      return;
    }
    closeEmptyState();
    addTask();
    displayTask();

    taskField.value = "";
    taskField.blur();
  }
});

// Modal window handlers for empty input

const closeModal = function () {
  showModal.classList.remove("open");
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

// Delete operation handler

toDoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const taskToBedelete = Number(e.target.closest(".todo").dataset.id);

    const index = taskArr.findIndex((item) => item.id === taskToBedelete);

    taskArr.splice(index, 1);

    displayTask();
  }
});

// Filter button handlers

filters.addEventListener("click", function (e) {
  if (e.target.classList.contains("filter")) {
    const [...btnFilter] = e.target.parentElement.children;
    btnFilter.forEach((btn) => btn.classList.remove("active-filter"));
    e.target.classList.add("active-filter");

    // const clicked = e.target.closest(".filter");
    // filterBtn.forEach((el) => el.classList.remove("active-filter"));
    // clicked.classList.add("active-filter");
    // currentFilter = `${clicked.dataset.state}`;

    currentFilter = `${e.target.dataset.state}`;

    // Refactored 2: displayTask is called based on currentFilter, no separate calling reqd.

    displayTask();
  }
});

// Checkbox Handler

toDoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkbox")) {
    const dataId = Number(e.target.closest(".todo").dataset.id);
    const index = taskArr.findIndex((el) => el.id === dataId);

    // if (taskArr[index].completed === false) {
    //   taskArr[index].completed = true;
    // } else taskArr[index].completed = false;

    taskArr[index].completed = !taskArr[index].completed;

    displayTask();
  }
});

// Completed tasks cleared

clearCompleted.addEventListener("click", function () {
  taskArr = taskArr.filter((el) => {
    if (el.completed === false) return el;
  });
  displayTask();
});
