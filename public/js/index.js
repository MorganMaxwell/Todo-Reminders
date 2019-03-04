$(document).ready(function () {
  // Get references to page elements
  var $submitBtn = $("#submit");
  var $exampleList = $("#example-list");
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
      res.render("index", {todos: result}, function(err) {
        if (err) throw err;
      });
    });
  };
  // // The API object contains methods for each kind of request we'll make
  // var API = {
  //   userData: function() {
  //     return $.ajax({
  //       method: "GET",
  //       url: "/api/user_data"
  //     });
  //   },
  //   newTodo: function(example) {
  //     return $.ajax({
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       type: "POST",
  //       url: "api/examples",
  //       data: JSON.stringify(example)
  //     });
  //   },
  //   getTodos: function() {
  //     return $.ajax({
  //       url: "api/todos/" + userId,
  //       type: "GET"
  //     });
  //   },
  //   deleteExample: function(id) {
  //     return $.ajax({
  //       url: "api/examples/" + id,
  //       type: "DELETE"
  //     });
  //   }
  // };
  // // refreshExamples gets new examples from the db and repopulates the list
  // var refreshExamples = function() {
  //   API.getExamples().then(function(data) {
  //     var $examples = data.map(function(example) {
  //       var $a = $("<a>")
  //         .text(example.text)
  //         .attr("href", "/example/" + example.id);

  //       var $li = $("<li>")
  //         .attr({
  //           class: "list-group-item",
  //           "data-id": example.id
  //         })
  //         .append($a);

  //       var $button = $("<button>")
  //         .addClass("btn btn-danger float-right delete")
  //         .text("ｘ");

  //       $li.append($button);

  //       return $li;
  //     });

  //     $exampleList.empty();
  //     $exampleList.append($examples);
  //   });
  // };

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
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);

  // open modal and allow collapsible checkboxes
  $(".modal").modal();
  $(".collapsible").collapsible();

  // function calls
  getUserData();
  getUserTodos();
});
