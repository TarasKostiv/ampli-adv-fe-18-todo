const addInput = document.querySelector('#add-input');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('.list');

function addTask() {
  const li = document.createElement('li');
  li.classList.add('list-elem');

  // const inputCheckbox = document.createElement('input');
  // inputCheckbox.classList.add('list_elem_ckeckbox');
  // inputCheckbox.type = 'checkbox';

  const spanTxt = document.createElement('span');
  spanTxt.classList.add('list-elem-txt');

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('list_elem_btn-delete');
  buttonDelete.append('Delete');

  if (addInput.value === '') {
    alert('Write your task');
  } else {
    const newTask = addInput.value;
    spanTxt.append(newTask);
    list.appendChild(li).append(spanTxt, buttonDelete);
    addInput.value = '';
    elemDelete(buttonDelete);
  }
}

function elemDelete(element) {
  element.addEventListener('click', (event) => {
    element.parentElement.remove();
    event.stopPropagation();
  });
}

addBtn.onclick = function () {
  addTask();
}