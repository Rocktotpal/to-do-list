# 03-To-do-list

## 1. Purpose

Develop an app to keep note & maintain daily tasks, mark completed, edit necessary details, delete tasks, and view filtered tasks.

## 2. Target Users

A person who wants to keep record of daily tasks and track them

## 3. Features

Create tasks
Edit tasks
Delete tasks
Mark completed tasks
Filter tasks

## 4. Sections

header
main
|-- section.create
|-- section.filters
|-- section.taskList
footer

## 5. Components

header
----|--Name
----|--day & date
main
--|-- section.create
--------|--input field
--------|--add
--|-- section.filters
--------|--all
--------|--active
--------|--completed
--|-- section.taskList
--------|--check button
--------|-- task name
--------|-- delete
footer
--|-- items left
--|-- clear completed

## 6. Layout Planning

---------------My Task-------------
---------Thursday, 09th July-------
------Task1----------------Add-----
---All----Active----Completed------
---checkBox---task--------delete---
---checkBox---task--------delete---
---checkBox---task--------delete---
----itemsLeft-----clearCompleted---

## 7. HTML Structure

body
--|--header
-------|--h1
-------|--h3
--|--main
-------|--section.create
------------|-- input
------------|-- div
-----------------|-- +
-------|--section.filters
------------|-- all
------------|-- active
------------|-- completed
-------|--section.taskList
------------|-- check input
------------|-- p
------------|-- delete symbol
--|-- footer
-------|-- p
-------|-- p

## 8. CSS Planning

header-- display: flex; direction: column; align & justify: center;

section.create-- display: flex; align & justify: center;
section.filters-- display: flex; align: centre; justify: start;
section.taskList-- display: flex; align: centre;
footer-- display: flex; align: center; justify: space between;

## 9. Responsive plan: Mobile

Same plan as it is vertical in design

## 10. Future Improvements

Student syllabus completion helper
Track time
Reminder alarm
Motivational Quotes for task completion
