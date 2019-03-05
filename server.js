require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("./config/passport");
var nodemailer = require("nodemailer");

var PORT = process.env.PORT || 8080;
var db = require("./models");


var app = express();
var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);



// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

// NodeMailer functions
let transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.gmail.com",
  // port: 465,
  // // port: 465,
  // secure: true, // true for 465, false for other ports
  auth: {
    user: "project2testuser@gmail.com", // generated ethereal user
    pass: "Password!@#" // generated ethereal password
  }
  // maxMessages: 100 // need to specify amount allowed to send at once or emails fail to send
});
let mailOptions = {
  // from: '"reminderApp :ghost:TESTING" <noreply@valenceservices.com',
  from: '"Remindr" <noreply@remindr.com>',
  replyto_name: "No Reply", //not defined properly but doesn't error code out
  replyto_email: "noreply@remindr.com", //not defined properly but doesn't error code out
  to: "project2testuser@gmail.com", // list of receivers
  subject: "Reminder", // Subject line
  text: 'Hello there, thanks for creating a reminder with us. We hope you enjoy using our App!', // plain text body
  html: "<p>Hello there, thanks for creating a reminder with us. We hope you enjoy using our App!</p>", // html body
  // attachDataUrls: link //company link
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error, "error in sending email function");
  }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

module.exports = app;
