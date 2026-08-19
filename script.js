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
// let currentTask = 0;
let taskArr = [];
let nextId = 1;
let currentFilter = "all";

if (taskArr.length === 0) emptyState.classList.remove("hidden");

const createTask = function (el) {
  // const task =
  //   el.completed === false
  //     ? `
  //   <li class="todo" data-id="${el.id}">
  //   <input type="checkbox" class="checkbox" />
  //   <div class="task"><p>${el.text}</p></div>
  //   <button class="delete"><i class="fa-solid fa-x delete"></i></button>
  //   </li>
  //   `
  //     : `
  //   <li class="todo" data-id="${el.id}">
  //   <input type="checkbox" class="checkbox" />
  //   <div class="task"><p class="task-completed">${el.text}</p></div>
  //   <button class="delete"><i class="fa-solid fa-x delete"></i></button>
  //   </li>
  //   `;

  // Refactored 1: avoid repeated HTML

  const decider = el.completed === false ? "<p>" : '<p class="task-completed">';
  const task = `
     <li class="todo" data-id="${el.id}">
     <input type="checkbox" class="checkbox" />
     <div class="task">${decider}${el.text}</p></div>
     <button class="delete"><i class="fa-solid fa-x delete"></i></button>
     </li>`;

  toDoList.insertAdjacentHTML("beforeend", task);
};

// const displayActiveTask = function () {
//   const activeTasks = taskArr.filter((task) => task.completed === false);

//   toDoList.innerHTML = "";
//   activeTasks.forEach(function (el) {
//     createTask(el);
//   });
// };

// const displayCompletedTask = function () {
//   const completedTasks = taskArr.filter((task) => task.completed === true);

//   toDoList.innerHTML = "";
//   completedTasks.forEach(function (el) {
//     createTask(el);
//   });
// };

const displayTask = function () {
  toDoList.innerHTML = "";

  const activeTasks = taskArr.filter((task) => task.completed === false);
  const completedTasks = taskArr.filter((task) => task.completed === true);

  if (currentFilter === "all") {
    taskArr.forEach((el) => createTask(el));
  } else if (currentFilter === "active") {
    activeTasks.forEach((el) => createTask(el));
  } else if (currentFilter === "completed") {
    completedTasks.forEach((el) => createTask(el));
  }

  const decider = activeTasks.length > 1 ? "items" : "item";
  itemCount.textContent = `${activeTasks.length} ${decider} left`;
};

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
  emptyState.classList.add("hidden");
  addTask();
  displayTask();

  taskField.value = "";
  taskField.blur();
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

    taskField.value = "";
    taskField.blur();
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

toDoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const taskToBedelete = Number(e.target.closest(".todo").dataset.id);

    const index = taskArr.findIndex((item) => item.id === taskToBedelete);

    taskArr.splice(index, 1);

    displayTask();
  }
});

filters.addEventListener("click", function (e) {
  if (e.target.classList.contains("filter")) {
    const [...btnFilter] = e.target.parentElement.children;
    btnFilter.forEach((btn) => btn.classList.remove("active-filter"));
    e.target.classList.add("active-filter");

    currentFilter = `${e.target.dataset.state}`;

    // Refactored 2: displayTask is called based on currentFilter, no separate calling reqd.

    displayTask();

    // if (e.target.dataset.state === "all") {
    //   displayTask();
    // }

    // if (e.target.dataset.state === "active") {
    //   displayActiveTask();
    // }

    // if (e.target.dataset.state === "completed") {
    //   displayCompletedTask();
    // }
  }
});

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

clearCompleted.addEventListener("click", function () {
  taskArr = taskArr.filter((el) => {
    if (el.completed === false) return el;
  });
  displayTask();
});

// toDoList.addEventListener("click", function (e) {
//   if (e.target.classList.contains("checkbox")) {
//     if (!e.target.classList.contains("checkbox-clicked")) {
//       e.target.classList.add("checkbox-clicked");
//       e.target
//         .closest(".todo")
//         .querySelector("p")
//         .classList.add("task-completed");
//       const completedId = Number(e.target.closest(".todo").dataset.id);

//       taskArr.forEach(function (task) {
//         if (task.id === completedId) {
//           task.completed = true;
//         }
//       });
//     } else {
//       e.target.classList.remove("checkbox-clicked");
//       e.target
//         .closest(".todo")
//         .querySelector("p")
//         .classList.remove("task-completed");

//       const completedId = Number(e.target.closest(".todo").dataset.id);

//       taskArr.forEach(function (task) {
//         if (task.id === completedId) {
//           task.completed = false;
//         }
//       });
//     }
//   }
// });

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
