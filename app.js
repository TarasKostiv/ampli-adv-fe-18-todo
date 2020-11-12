const addInput = document.getElementById('add-input');
const addBtn = document.getElementById('add-btn');
const list = document.querySelector('.list');
const items = list.children;
const countNum = document.querySelector('.task-counter_num');
const filterSelector = document.querySelector('.filter-selection');

// Визначення завдань на початку роботи сторінки
countNum.innerText = items.length;

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
    taskText.innerText = addInput.value;
    newTask.append(taskCheckbox, taskText, taskDeleteBtn);
    list.appendChild(newTask);
    addInput.value = '';
  } else {
    alert('Write your task, please!');
  }

  // Функціонал завдань: видалення і заштриховування
  taskDeleteBtn.addEventListener('click', () => {
    newTask.remove();
    countNum.innerText = items.length;
  });
  taskCheckbox.addEventListener('click', () => { newTask.classList.toggle('list_elem_txt__checked'); });

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


filterSelector.addEventListener('click', filterTodo);
// Виконання фунції при натисканні кнопки
addBtn.addEventListener('click', addTask);
