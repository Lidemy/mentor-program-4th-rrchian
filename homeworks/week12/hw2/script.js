/* eslint-env jquery */
/* eslint-env es6 */
/* eslint-disable no-alert, no-unused-vars */

const listsContainer = $('[data-lists]');
const newListForm = $('[data-new-list-form]');
const newListInput = $('[data-new-list-input]');
const deleteListBtn = $('[data-delete-list-btn]');
const listDisplayContainer = $('[data-list-display-container]');
const listTitleElement = $('[data-list-title]');
const listCountElement = $('[data-list-count]');
const tasksContainer = $('[data-tasks]');
const newTaskForm = $('[data-new-task-form]');
const newTaskInput = $('[data-new-task-input]');
const taskTemplate = document.getElementById('task-template');
const clearCompleteTasksBtn = $('[data-clear-complete-tasks-btn]');
const taskFilter = $('.tasks-filter');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

// init lists
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

function clearElement(e) {
  $(e).empty();
}

// need to understand/rewrite, especially the taskTemplate
function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true); // taskElement is a object
    const taskNew = taskElement.querySelector('.task');
    taskNew.setAttribute('data-task-status', task.status);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.append(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
  listCountElement.text(`${incompleteTaskCount} 個未完成的任務`);
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    // to check which list is selected
    listElement.dataset.listID = list.id;
    listElement.classList.add('list-name');
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }
    $(listsContainer).append(listElement);
  });
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement($(listsContainer));
  renderLists();
  const selectedList = lists.find(list => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.hide();
  } else {
    listDisplayContainer.show();
    listTitleElement.text(selectedList.name);
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

function saveAndRender() {
  save();
  render();
}

function createList(listName) {
  return {
    id: Date.now().toString(), name: listName, tasks: [],
  };
}

function createTask(taskName) {
  return {
    id: Date.now().toString(), name: taskName, complete: false, status: 'incomplete',
  };
}

listsContainer.click((e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listID;
    saveAndRender();
  }
});

// event delegation
tasksContainer.on('click', '.btn-delete-task', (e) => {
  if (e.target.tagName.toLowerCase() === 'button') {
    $(e.target).parent().parent().remove();
    const deteleTaskId = e.target.parentNode.parentNode.querySelector('input').id;
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => task.id !== deteleTaskId);
    save();
    renderTaskCount(selectedList);
  }
});

// wonder if there's a better way to rewrite this code...
tasksContainer.on('click', '.btn-edit-task', (e) => {
  if (e.target.tagName.toLowerCase() === 'button') {
    const editTask = e.target.parentNode.parentNode;
    const editTaskId = e.target.parentNode.parentNode.querySelector('input').id;
    const selectedList = lists.find(list => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(task => task.id === editTaskId);
    // create edit task input area
    const divElement = document.createElement('div');
    divElement.classList.add('edit-task-area');
    divElement.innerHTML = '<form action="" data-edit-task-form><input style="font-style: italic;" type="text" id="edit-task" placeholder="edit task here and ENTER!" data-edit-task-input></form>';
    $(editTask).after(divElement);

    // edit task and save into localstorage
    $('[data-edit-task-form]').submit((el) => {
      el.preventDefault();
      const editTaskName = $('[data-edit-task-input]').val();
      if (editTaskName == null || editTaskName === '') return;
      selectedTask.name = editTaskName;
      saveAndRender();
    });
  }
});

taskFilter.on('click', 'button', (e) => {
  const target = $(e.target);
  const filter = target.attr('data-filter');
  const tasks = document.querySelectorAll('[data-task-status]');
  if (filter === 'all') {
    $(tasks).show();
  } else if (filter === 'incomplete') {
  // wonder if the better way to rewrite the if else statement
    tasks.forEach((task) => {
      if (task.dataset.taskStatus === 'complete') {
        $(task).hide();
      } else {
        $(task).show();
      }
    });
  } else { // complete
    tasks.forEach((task) => {
      if (task.dataset.taskStatus === 'incomplete') {
        $(task).hide();
      } else {
        $(task).show();
      }
    });
  }
});

newListForm.submit((e) => {
  e.preventDefault();
  const listName = newListInput.val();
  if (listName == null || listName === '') return;
  const list = createList(listName);
  newListInput.val('');
  lists.push(list);
  saveAndRender();
});

newTaskForm.submit((e) => {
  e.preventDefault();
  const taskName = newTaskInput.val();
  if (taskName == null || taskName === '') return;
  const task = createTask(taskName);
  newTaskInput.val('');
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

tasksContainer.click((e) => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
    selectedTask.complete = e.target.checked;
    if (selectedTask.status === 'incomplete') {
      selectedTask.status = 'complete';
    } else if (selectedTask.status === 'complete') {
      selectedTask.status = 'incomplete';
    }
    saveAndRender();
    renderTaskCount(selectedList);
  }
});

deleteListBtn.click((e) => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

clearCompleteTasksBtn.click((e) => {
  const selectedList = lists.find(list => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
  saveAndRender();
});

render();
