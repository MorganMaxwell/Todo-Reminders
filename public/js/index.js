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
  // function getUserTodos() {
  //   $.ajax("/api/todos/" + userId, {
  //     method: "GET"
  //   }).then(function (result) {
  //     result.render("index", { todos: result }, function (err) {
  //       if (err) throw err;
  //     });
  //   });
  // };


  // push a new Todo to the database
  function newTodo() {
    console.log("index.js ln 30")
    let date = new Date();
    let data = {
      title: $("#title").val().trim(),
      description: $("#description").val().trim(),
      category: $("#category").val().trim(),
      recurring: false,
      recurringTime: false,
      // 1 is daily, 2 is weekly, 3 is monthly, 4 is yearly
      recurring: $('input[name=group3]:checked').val(),
      // date: moment().format(),
      userId: userId,
    };
    $.ajax("/api/createNew/", {
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

  $(".modal").modal();
  $(".collapsible").collapsible();
  $("#formSubmit").click(newTodo);


  // function calls
  getUserData();
  // getUserTodos();
});