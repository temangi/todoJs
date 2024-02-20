let arrayTodos = JSON.parse(localStorage.getItem("todoList")) || [];
AddTodo(arrayTodos)
document.querySelector("button").addEventListener("click", function () {
  let inputResult = document.querySelector("#inputTodo");
  arrayTodos.push(inputResult.value);
  AddTodo(arrayTodos);
  inputResult.value = ""
});

function AddTodo(array) {
  arrayTodos = array
  localStorage.setItem("todoList" , JSON.stringify(arrayTodos))
  let listTodo = document.querySelector("#listTodo");
  listTodo.innerHTML = "";
  arrayTodos.forEach((el) => {
    let todo = document.createElement("div");
    todo.innerHTML = `
              <input type="text" value="${el}" id ="todoInput" class = "hide" />
              <p class = "show">${el}</p>
              <button class="btn-del" >Del</button>
              <button class="btn-done" >Done</button> 
              <button class="btn-edit">Edit</button>
          `;
    listTodo.appendChild(todo);
    let btnDel = todo.querySelector(".btn-del");
    let btnTitle = todo.querySelector("p");
    btnDel.addEventListener("click", function () {
      arrayTodos = arrayTodos.filter((el) => el !== btnTitle.innerHTML);
      AddTodo(arrayTodos)
    });
    let btnDone = todo.querySelector(".btn-done");
    let status = false
    btnDone.addEventListener("click", function () {
        status = !status
        status? btnTitle.classList.add("done") :   btnTitle.classList.remove("done");
      });
    let btn_edit = todo.querySelector(".btn-edit");
    let inputEdit = todo.querySelector("#todoInput")
    let statusEdit = false
    let textInput = ""
    btn_edit.addEventListener("click", function() {
      statusEdit = !statusEdit
      textInput = inputEdit.value
     if(statusEdit){
      btn_edit.innerHTML = "Save"
      btnTitle.classList.remove("show")
      btnTitle.classList.add("hide")
      inputEdit.classList.remove("hide")
      inputEdit.classList.add("show")
     }else{
      btn_edit.innerHTML = "Edit"
      btnTitle.classList.remove("hide")
      btnTitle.classList.add("show")
      inputEdit.classList.remove("show")
      inputEdit.classList.add("hide")
      arrayTodos = arrayTodos.map(el => {
        if (el == btnTitle.innerHTML){
          return el.innerHTML = textInput
        }
        return el
      })
      btnTitle.innerHTML = textInput
      AddTodo(arrayTodos)
     }
    });
  });
};
