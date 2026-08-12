"use strict";

const date = document.getElementById("date");
const taskField = document.querySelector(".task-field");
const btnAdd = document.querySelector(".add");
const toDoList = document.querySelector(".todos-list");
const showModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");
const itemCount = document.getElementById("items-left");
const btnDelete = document.querySelector(".delete");

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

const addTask = function () {
  toDoList.innerHTML = "";

  if (taskField.value.trim() === "") {
    showModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
  }

  taskArr.push(taskField.value);

  displayTask();

  currentTask++;

  itemCount.textContent = `${currentTask} items left`;
};

btnAdd.addEventListener("click", function () {
  addTask();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

const closeModal = function () {
  showModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", function () {
  closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || !showModal.classList.contains("hidden")) {
    closeModal();
  }
});

document.querySelector(".todos-list").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("delete")) {
    const taskToBedelete = e.target
      .closest(".todo")
      .querySelector("p").textContent;
    console.log(taskToBedelete);
    const index = taskArr.findIndex((task) => task === taskToBedelete);

    taskArr.splice(index, 1);
    toDoList.innerHTML = "";

    displayTask();

    currentTask--;

    itemCount.textContent = `${currentTask} items left`;
  }
});
