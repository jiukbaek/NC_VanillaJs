//todo.js
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOES_LS = "toDoes";

let toDoes = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDoes = toDoes.filter(function(toDo){
        
        return toDo.id !== parseInt(li.id);
    });
    toDoes = cleanToDoes;
    saveToDoes();
}


function saveToDoes(){
    localStorage.setItem(TODOES_LS,JSON.stringify(toDoes));    
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDoes.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    }
    toDoes.push(toDoObj);
    saveToDoes();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDoes(){
    const loadToDoes = localStorage.getItem(TODOES_LS);
    if(loadToDoes !== null){
        const parsedToDoes = JSON.parse(loadToDoes);
        parsedToDoes.forEach(function(toDo){
           paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDoes()
    toDoForm.addEventListener("submit", handleSubmit);
}
init();

