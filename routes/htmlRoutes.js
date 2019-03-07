var db = require("../models");
//Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });
  app.get("/members", isAuthenticated, function (req, res) {
    console.log(req.body, req.params)
    db.Items.findAll({}).then(function(dbReminders) {
      console.log(dbReminders, "line30")
      res.render("members", {reminders: dbReminders});
    });
    // where is my data?
   
  })
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/getReminders/:id", isAuthenticated, function(req, res) {
    db.Items.findAll({}).then(function(dbReminders) {
      console.log(dbReminders, "line30")
      res.render("members", {reminders: dbReminders});
    });
    // res.render("members");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
