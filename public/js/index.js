$(document).ready(function () {
  // Get references to page elements
  var userId = $(".member-name").attr("data-id");
  // grab data from the database that matches the user's ID #
  function getUserTodos() {
    $.ajax("/api/todos/" + userId, {
      method: "GET"
    });
  };

  // push a new Todo to the database
  function newTodo() {
    let data = {
      title: $("#title").val().trim(),
      description: $("#description").val().trim(),
      category: $("#category").val().trim(),
      // 1 is daily, 2 is weekly, 3 is monthly, 4 is yearly
      recurringTime: $("input[name=group3]:checked").val().trim(),
      date: moment().format(),
      userId: userId,
    };
    console.log(data);
    if (data.recurringTime) {
      data.recurring = true;
    };
    $.ajax("/api/createNew/" + userId, {
      method: "POST",
      data: data
    }).then(function (result) {
      // location.reload();
    });
  };
  // put route to edit a Todo. just rewrites the whole thing,
  // whether new data exists or not.
  function editTodo() {
    let data = {
      title: $("#title").val().trim(),
      description: $("#description").val().trim(),
      category: $("#category").val().trim(),
      // 1 is daily, 2 is weekly, 3 is monthly, 4 is yearly
      recurring: $("checkbox").val().trim(),
      date: moment().format(),
      userId: userId,
      itemId: itemId
    };
    $.ajax("/api/createNew/" + userId, {
      method: "PUT",
      data: data
    }).then(function (result) {
      location.reload();
    });
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  function deleteTodo() {

  };

  // Add event listeners to the submit and delete buttons
  $("#formSubmit").click(newTodo);
  // open modal and close modal
  $(".modal").modal();
  // collapsible list for recurring options
  $(".collapsible").collapsible();
  // open calendar to pick Due Date
  $('.datepicker').datepicker();
  // function calls
  getUserTodos();
});