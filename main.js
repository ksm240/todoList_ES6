(function(){
  const addButton = document.getElementById('addButton');
  const addInput = document.getElementById('itemInput');
  const todoList = document.getElementById('todoList');
  const clearButton = document.getElementById('clearButton');
  let listArray = [];


  function listItemObj() {
    return {
      content: '',
      status: 'incomplete'
    }
  }

  const changeToComp = (e) => {
    const { target: { parentElement } } = e;
    parentElement.className = 'completed well';
    e.target.innerText = 'Incomplete';
    e.target.removeEventListener('click', changeToComp);
    e.target.addEventListener('click',changeToInComp);
    changeListArray(parentElement.firstChild.innerText, 'complete');
  }

  const changeToInComp = (e) => {
    const { target: { parentElement }} = e;
    parentElement.className = 'incomplete well';
    e.target.innerText = 'Complete';
    e.target.removeEventListener('click', changeToInComp);
    e.target.addEventListener('click', changeToComp);
    changeListArray(parentElement.firstChild.innerText, 'incomplete');
  }

  const removeItem = (e) => {
    const parent = e.currentTarget.parentElement.parentElement;
    parent.removeChild(e.currentTarget.parentElement);

    const data = e.currentTarget.parentElement.firstChild.innerText;
    listArray.some((item, i) => {
      if(item.content == data) {
        listArray.splice(i, 1);
        refreshLocal();
      }
    });
  }

  const changeListArray = (data, status) => {
    for(let i=0; i < listArray.length; i++){
      if(listArray[i].content == data){
        listArray[i].status = status;
        refreshLocal();
        break;
      }
    }
  }

  const createItemDom = (text, status) => {
    const listItem = document.createElement('li');
    const itemLabel = document.createElement('label');
    const itemCompBtn = document.createElement('button');
    const itemIncompBtn = document.createElement('button');

    const todoStatus = Object.freeze({
      complete: Object.freeze({
        className: 'completed well',
        btnLabel: 'Incomplete',
      }),
      incomplete: Object.freeze({
        className: 'incomplete well',
        btnLabel: 'Complete',
      }),
    });
    listItem.className = todoStatus[status].className;
    itemCompBtn.innerText = todoStatus[status].btnLabel;

    itemLabel.innerText = text;

    itemCompBtn.className = 'btn btn-success mr-2';

    itemIncompBtn.className = 'btn btn-danger';
    itemIncompBtn.innerHTML = '<i class="fas fa-trash"></i>';
    itemIncompBtn.addEventListener('click', removeItem);

    if (status == 'incomplete') {
      itemCompBtn.addEventListener('click', changeToComp);
    }else{
      itemCompBtn.addEventListener('click', changeToInComp);
    }

    listItem.appendChild(itemLabel);
    listItem.appendChild(itemCompBtn);
    listItem.appendChild(itemIncompBtn);

    return listItem;
  }

  const refreshLocal = () => {
    const todos = listArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
  }

  const addToList = () => {
    const newItem = new listItemObj;
    newItem.content = addInput.value;
    const item = createItemDom(addInput.value, 'incomplete');
    listArray.push(newItem);
    refreshLocal();
    todoList.appendChild(item);
    addInput.value ='';
  }

  const clearList = () => {
    listArray = [];
    localStorage.removeItem('todoList');
    todoList.innerHTML = '';
  }

  window.onload = () => {
    const list = localStorage.getItem('todoList');
    if (list != null) {
      listArray = JSON.parse(list);
      const fragment = document.createDocumentFragment();
      listArray.forEach((todo) => {
        const item = createItemDom(todo.content, todo.status);
        fragment.appendChild(item);
      });
      todoList.appendChild(fragment);
    }
  }

  addButton.addEventListener('click',addToList);
  clearButton.addEventListener('click', clearList);
}());
