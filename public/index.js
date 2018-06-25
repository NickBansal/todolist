/* global $ */

$(document).ready(function(){
    $.getJSON("/api/todo")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    })
    $("#todoInput").keypress(function(e){
        if (e.charCode == 13) {
            createTodo();
        }
    })
    $(".list").on("click", "span", function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    })
    $(".list").on("click", "li", function(){
        updateTodo($(this));  
    })
})




// CREATING A TODO

function createTodo(todos) {
    var usrInput = $('#todoInput').val();
    $.post("/api/todo", {name: usrInput})
    .then(function(data){
        $('#todoInput').val('')
        addTodo(data);
    })
    .catch(function(err){
        console.log(err);
    })
}


// ADDING A NEW TODO 

function addTodos(todo) {
    todo.forEach(function(data){
        addTodo(data);
    })
}


function addTodo(todos){
    var newTodo = $('<li class="task">' + todos.name + '<span>X</span></li>') 
    newTodo.data("id", todos._id);
    newTodo.data("completed", todos.completed)
    if (todos.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}





// REMOVING A TODO

function removeTodo(todo) {
    var clickedId = todo.data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/todo/" + clickedId,
        })
        .then(function(data){
            console.log("deleted: " + data);
            todo.remove();
        })
        .catch(function(err){
            console.log(err);
        })
}

function updateTodo(todo) {
    var isDone = !todo.data("completed")
    var updateData = {completed: isDone}
    $.ajax({
        method: "PUT",
        url: "/api/todo/" + todo.data("id"),
        data: updateData,
    })
    .then(function(data){
       todo.toggleClass("done")
       todo.data("completed", isDone)
    })
}