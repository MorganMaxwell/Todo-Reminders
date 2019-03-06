var db = require("../models");
var passport = require("../config/passport");
var nodemailer = require("nodemailer");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the index page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log("after Authentication");
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the index page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //NodeMailer route post to /api/members/reminder/send
  app.post("/api/members/reminder/send", function(req, res, next) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'project2testuser@gmail.com',
        pass: 'Password!@#'
      }
    })
  
    const mailOptions = {
      // from: '"reminderApp :ghost:TESTING" <noreply@valenceservices.com',
    from: '"Remindr" <noreply@remindr.com>',
    replyto_name: "No Reply", //not defined properly but doesn't error code out
    replyto_email: "noreply@remindr.com", //not defined properly but doesn't error code out
    to: "project2testuser@gmail.com", // list of receivers
    subject: "Reminder", // Subject line
    text: 'Hello there, thanks for creating a reminder with us. We hope you enjoy using our App!', // plain text body
    html: "<p>Hello there, thanks for creating a reminder with us. We hope you enjoy using our App!</p>", // html body
    // attachDataUrls: link //company link
      }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error, "error in sending email function");
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });

  // Post route for Create New Item
  // ==============================================================
  app.post("/api/createNew/", function (req, res) {
    db.Items.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      reoccurring: req.body.recurring,
      dueDate: req.body.date
    })
      .then(function(dbItems) {
        console.log(dbItems);
        res.json(dbItems);
        console.log(dbItems);
      })
      .catch(function(err) {
        console.log(err.stack);
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
