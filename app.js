const addInput = document.getElementById('add-input');
const addBtn = document.getElementById('add-btn');
const list = document.querySelector('.list');
const items = list.children;
const countNum = document.querySelector('.task-counter_num');
const filterSelector = document.querySelector('.filter-selection');
const deletLocalStorageBtn = document.getElementById('delete-local-storage');

countNum.innerText = items.length;
class elementTask {
  constructor(key, checked, deleted) {
    this.key = key;
    this.checked = checked;
    this.deleted = deleted;
  }
}

function loadLocalStorage() {
  for (let key in localStorage) {

    let parsedStorage = JSON.parse(localStorage.getItem(key));
    if (parsedStorage != null) {

      console.log(parsedStorage.checked);

      const newTask = document.createElement('li');
      newTask.classList.add('list_elem');

      const taskCheckbox = document.createElement('input');
      taskCheckbox.classList.add('list_elem_txt');
      taskCheckbox.type = 'checkbox';

      const taskText = document.createElement('span');
      taskText.classList.add('list_elem_txt');

      const taskDeleteBtn = document.createElement('button');
      taskDeleteBtn.classList.add('list_elem_btn-delete');

      const trashIcon = document.createElement('img');
      trashIcon.classList.add('list_elem_img-trash');
      trashIcon.src = "./trash-icon.png";
      taskDeleteBtn.appendChild(trashIcon);

      if (parsedStorage.checked === true) {
        newTask.classList.add('list_elem_txt__checked');

        taskCheckbox.checked = 'checked';
      }

      taskText.innerText = parsedStorage.key;
      newTask.append(taskCheckbox, taskText, taskDeleteBtn);
      list.appendChild(newTask);

      taskDeleteBtn.addEventListener('click', () => {

        targetElement = newTask.textContent;
        console.log(targetElement);

        getParsedElement = JSON.parse(localStorage.getItem(targetElement));
        if (getParsedElement.deleted === false) {
          getParsedElement.deleted = true;
          localStorage.removeItem(targetElement);
        }

        newTask.remove();
        countNum.innerText = items.length;

      });

      taskCheckbox.addEventListener('click', () => {
        newTask.classList.toggle('list_elem_txt__checked');

        targetElement = newTask.textContent;
        console.log(targetElement);

        getParsedElement = JSON.parse(localStorage.getItem(targetElement));
        if (getParsedElement.checked === false) {
          getParsedElement.checked = true;
          localStorage.removeItem(targetElement);
          localStorage.setItem(targetElement, JSON.stringify(getParsedElement));
        } else {
          getParsedElement.checked = false;
          localStorage.removeItem(targetElement);
          localStorage.setItem(targetElement, JSON.stringify(getParsedElement));
        }
      });
    }
  }
}
loadLocalStorage();

// Визначення завдань на початку роботи сторінки

function addTask() {
  // Ініціалізація елементів
  const newTask = document.createElement('li');
  newTask.classList.add('list_elem');

  const taskCheckbox = document.createElement('input');
  taskCheckbox.classList.add('list_elem_txt');
  taskCheckbox.type = 'checkbox';

  const taskText = document.createElement('span');
  taskText.classList.add('list_elem_txt');

  const taskDeleteBtn = document.createElement('button');
  taskDeleteBtn.classList.add('list_elem_btn-delete');

  const trashIcon = document.createElement('img');
  trashIcon.classList.add('list_elem_img-trash');
  trashIcon.src = "./trash-icon.png";
  taskDeleteBtn.appendChild(trashIcon);
  // Добавляння елементів в HTML
  if (addInput.value) {
    newElementask = new elementTask(addInput.value, false, false);
    stringifiedNewElementTask = JSON.stringify(newElementask);
    console.log(stringifiedNewElementTask);
    localStorage.setItem(newElementask.key, stringifiedNewElementTask);

    taskText.innerText = addInput.value;
    newTask.append(taskCheckbox, taskText, taskDeleteBtn);
    list.appendChild(newTask);
    addInput.value = '';
  } else {
    alert('Write your task, please!');
  }

  // Функціонал завдань: видалення і заштриховування
  taskDeleteBtn.addEventListener('click', () => {

    targetElement = newTask.textContent;
    console.log(targetElement);

    getParsedElement = JSON.parse(localStorage.getItem(targetElement));
    if (getParsedElement.deleted === false) {
      getParsedElement.deleted = true;
      localStorage.removeItem(targetElement);
    }

    newTask.remove();
    countNum.innerText = items.length;

  });
  taskCheckbox.addEventListener('click', () => {
    newTask.classList.toggle('list_elem_txt__checked');

    targetElement = newTask.textContent;
    console.log(targetElement);

    getParsedElement = JSON.parse(localStorage.getItem(targetElement));
    if (getParsedElement.checked === false) {
      getParsedElement.checked = true;
      localStorage.removeItem(targetElement);
      localStorage.setItem(targetElement, JSON.stringify(getParsedElement));
    } else {
      getParsedElement.checked = false;
      localStorage.removeItem(targetElement);
      localStorage.setItem(targetElement, JSON.stringify(getParsedElement));
    }
  });

  // Лічильник завданнь
  countNum.innerText = items.length;
}

function filterTodo(e) {
  const todos = list.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'block';
        break;
      case 'completed':
        if (todo.classList.contains('list_elem_txt__checked')) {
          todo.style.display = 'block';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('list_elem_txt__checked')) {
          todo.style.display = 'block';
        } else {
          todo.style.display = 'none';
        }
    }
  })
}

function deleteLocalStorageSave() {
  localStorage.clear();
  document.location.reload(true);
}

deletLocalStorageBtn.addEventListener('click', deleteLocalStorageSave);
filterSelector.addEventListener('click', filterTodo);
addBtn.addEventListener('click', addTask);
