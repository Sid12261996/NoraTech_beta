const Enroll_Student = require("../controllers/EnrolledController");
var Router = require('express').Router();

Router.post('', Enroll_Student.Enroll_Student);

module.exports = Router;
