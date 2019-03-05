$(document).ready(function () {
  // Get references to page elements
  var userId = "";

  // have to have the userId for the rest of the data to be retrieved from db properly
  function getUserData() {
    $.ajax("/api/user_data", {
      method: "GET"
    }).then(function (result) {
      // store user's specific ID on a global variable.
      userId = result.id;
    });
    return userId;
  };

  // grab data from the database that matches the user's ID #
  function getUserTodos() {
    $.ajax("/api/todos/" + userId, {
      method: "GET"
    }).then(function (result) {
      result.render("index", { todos: result }, function (err) {
        if (err) throw err;
      });
    });
  };

  
  // push a new Todo to the database
  function newTodo() {
    let data = {
      title: $("#title").val().trim(),
      description: $("#description").val().trim(),
      category: $("#category").val().trim(),
      // 1 is daily, 2 is weekly, 3 is monthly, 4 is yearly
      recurring: $("checkbox").val().trim(),
      date: moment().format(),
      userId: userId,
    };
    $.ajax("/api/createNew/" + userId, {
      method: "POST",
      data: data
    }).then(function (result) {
      location.reload();
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
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
      refreshExamples();
    });
  };

  // Add event listeners to the submit and delete buttons
  $("#formSubmit").click(newTodo);
  // not set up for functionality yet.
  // edit a Todo
  $("#formSubmit").click(editTodo);
  // open modal and allow collapsible checkboxes
  $(".modal").modal();
  $(".collapsible").collapsible();

  // function calls
  getUserData();
  getUserTodos();
});
