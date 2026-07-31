"use strict";

const date = document.getElementById("date");
const taskField = document.querySelector(".task-field");
const btnAdd = document.querySelector(".add");
const toDoList = document.querySelector(".todos-list");

const now = new Date();
const options = {
  day: "numeric",
  month: "short",
  weekday: "short",
  year: "numeric",
};
date.textContent = new Intl.DateTimeFormat("en-IN", options).format(now);

toDoList.innerHTML = "";

btnAdd.addEventListener("click", function () {
  const task = `
<li class="todo">
<input type="checkbox" class="checkbox" />
            <div class="task"><p>${taskField.value}</p></div>
            <button class="delete"><i class="fa-solid fa-x"></i></button>
          </li>
`;
  toDoList.insertAdjacentHTML("afterbegin", task);
});
