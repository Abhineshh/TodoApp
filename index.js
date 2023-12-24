let taskArrayData = JSON.parse(localStorage.getItem('myData')) || [];

const add_button = document.querySelector('.add-button');
const task_lister = document.querySelector('.task-lister');
const table_body = document.querySelector('.table-body');
const table_row = document.querySelector('.table-row');
const edit_button = document.querySelector('.edit-button');
const delete_button = document.querySelector('.delete-button');
const done_button = document.querySelector('.done-button');

window.addEventListener("DOMContentLoaded", () => {
  DisplayTheTasks();
  if (!todos.length) {
    
  }
});

window.addEventListener('DOMContentLoaded',()=>{
   DisplayTheTasks();
   if(!taskArrayData.length){
    table_body.innerHTML = `No tasks here`;
   }
});


add_button.addEventListener('click', () => {
    const task_name = document.querySelector('.task-name').value;
    const task_time = document.querySelector('.task-time').value;
    taskArrayData.push({
        NameOfTask: task_name,
        DateOfTask: task_time,
        StatusOfTask: 'pending',
        IdOfTask: getUniqueId(),
    });
    DisplayTheTasks();
    localStorage.setItem('myData',JSON.stringify(taskArrayData));
    task_name.value="";
    task_time.value="";
});

function getUniqueId(){
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );
}

function DisplayTheTasks() {
    if (taskArrayData.length == 0) {
        table_body.innerHTML = `No Task as of now`;
        return;
    }
    table_body.innerHTML = '';
    taskArrayData.forEach((trow) => {
        table_body.innerHTML += `
            <tr class="table-row">
               <td>${trow.NameOfTask}</td>
               <td>${trow.DateOfTask}</td>
               <td>${trow.StatusOfTask}</td>
               <td>
                  <button class="edit-button" onclick="editTodo('${trow.IdOfTask}');" title="Edit the Task Name">✏️</button>
                  <button class="delete-button" onclick="deleteTodo('${trow.IdOfTask}');" title="Delete the Task">🗑️</button>
                  <button class="done-button" onclick="doneTodo('${trow.IdOfTask}')" title="Assign the Task Complete">✅</button>
               </td>
            </tr>
        `;
    });
}

function deleteTodo(id){
    taskArrayData = taskArrayData.filter((todo) => todo.IdOfTask !== id);
    localStorage.setItem('myData',JSON.stringify(taskArrayData));
    DisplayTheTasks();
}

function editTodo(id){
    let taskname = window.prompt(`Enter the name of the task ${id}`);
    taskArrayData = taskArrayData.map(obj => {
        if(obj.IdOfTask == id){
            obj.NameOfTask = taskname;
            return obj; 
        } else {
            return obj;
        }
    }); 
    localStorage.setItem('myData',JSON.stringify(taskArrayData));
    DisplayTheTasks();
}

function doneTodo(id){
     taskArrayData = taskArrayData.map(obj => {
        if(obj.IdOfTask == id){
            obj.StatusOfTask = "completed";
            return obj; 
        } else {
            return obj;
        }
    }); 
    localStorage.setItem('myData',JSON.stringify(taskArrayData));
    DisplayTheTasks();
}

