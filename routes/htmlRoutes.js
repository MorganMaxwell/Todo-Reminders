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
      console.log("hello");
      console.log(req.user);
      res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    console.log("hello2");

    res.render("members");
  });

  // Load index page
  app.get("/", function(req, res) {
    db.Items.findAll({}).then(function(dbItems) {
      res.render("index", {
        msg: "Welcome!",
        Items: dbItems
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
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
  app.get("*", function(req, res) {
    res.render("404");
  });
};
