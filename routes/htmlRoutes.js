var db = require("../models");
//Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members");
  });

  // Load members page
  app.get("/api/todos/:id", function (req, res) {
    db.Items.findAll({
      where: { id: req.params.id }
    }).then(function (dbReminders) {
      res.render("members", {
        msg: "Welcome!",
        examples: dbReminders
      });
    });
  });

  // Post route for Create New Item
  // ==============================================================
  app.post("/api/createNew/", function(req, res) {
    db.Items.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      reoccurring: req.body.recurring
      //duedate: req.body.date
    }).then(function(dbItems) {
      console.log(dbItems);
      res.json(dbItems);
      console.log(dbItems);
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
