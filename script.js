"use strict";

const date = document.getElementById("date");

const now = new Date();
const day = now.getDay();
const month = `${now.getDate()}`.padStart(2, 0);
const year = now.getFullYear();
console.log(day, month, year);
// date.textContent = `${}`;
