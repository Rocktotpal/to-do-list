"use strict";

const date = document.getElementById("date");
const taskField = document.querySelector(".task-field");
const btnAdd = document.querySelector(".add");
const toDoList = document.querySelector(".todos-list");
const showModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn-close-modal");

const now = new Date();
const options = {
  day: "numeric",
  month: "short",
  weekday: "short",
  year: "numeric",
};
date.textContent = new Intl.DateTimeFormat("en-IN", options).format(now);

toDoList.innerHTML = "";

const addTask = function () {
  if (taskField.value.trim() === "") {
    showModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    return;
  }

  const task = `
<li class="todo">
<input type="checkbox" class="checkbox" />
            <div class="task"><p>${taskField.value}</p></div>
            <button class="delete"><i class="fa-solid fa-x"></i></button>
          </li>
`;
  console.log(taskField.value);
  toDoList.insertAdjacentHTML("afterbegin", task);
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
  console.log(e);
  if (e.key === "Escape" || !showModal.classList.contains("hidden")) {
    closeModal();
  }
});
