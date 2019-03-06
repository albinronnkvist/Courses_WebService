// Dependencies
const express = require('express');
const router = express.Router();
const cors = require('cors');



// Include Courses-Schema
const Course = require('../models/Course');
router.use(cors());


// REST-api for courses
// GET
// Get all courses
router.get("/get", (req, res) => {

    // Find courses-documents in DB and send result
    Course.find().sort({sort: -1}).exec((err, AllCourses) => {
        // If there was an error
        if(err) {
            // Send error-message
            res.send(err);
        }
        else {
            // Convert result to JSON and send
            res.json(AllCourses);
        }
    });
});

// Get specific course by id
router.get("/get/:id", (req, res) => {

    // Find course-document in DB and send result
    Course.findById(req.params.id, (err, singleCourse) => {
        // If there was an error
        if(err) {
            // Send error-message
            res.send(err);
        }
        else {
            // Convert result to JSON and send
            res.json(singleCourse);
        }
    })
});

// POST
router.post("/add", (req, res) => {

    // New instance of Courses schema
    var course = new Course();

    // Create new object
    course.name = req.body.name;
    course.term = req.body.term;
    course.summary = req.body.summary;
    course.courseWebsite = req.body.courseWebsite;
    course.repo = req.body.repo;
    course.tags = req.body.tags;
    course.color = req.body.color;
    course.sort = req.body.sort;

    // Store new course in database 
    course.save((err) => {
        // If there was an error
        if(err) {
            // Send error message
            res.send(err);
        }
    });

    // Send object
    res.send(course);
});

// PUT
router.put("/update/:id", (req, res) => {

    // Get the id from id-parameter
    var updateId = req.params.id;

    // Update course that matches updateId
    Course.findOne({_id: updateId}, (err, course) => {
        // If there was an error
        if(err) {
            // Send error message
            res.send(err);
        } 
        else {
            // If no courses matched the updateId
            if(!course) {
                // Send error 404-message(not found)
                res.status(404).send();
            } 
            else {
                // Update returned course
                if(req.body.name) {
                    course.name = req.body.name;
                }
                if(req.body.term) {
                    course.term = req.body.term;
                }
                if(req.body.summary) {
                    course.summary = req.body.summary;
                }
                if(req.body.courseWebsite) {
                    course.courseWebsite = req.body.courseWebsite;
                }
                if(req.body.repo) {
                    course.repo = req.body.repo;
                }
                if(req.body.tags) {
                    course.tags = req.body.tags;
                }
                if(req.body.color) {
                    course.color = req.body.color;
                }
                if(req.body.sort) {
                    course.sort = req.body.sort;
                }

                // Store updated course in database 
                course.save((err, updatedCourse) => {
                    // If there was an error
                    if(err) {
                        // Send error message
                        res.send(err);
                    } 
                    else {
                        // Send object
                        res.send(course);
                    }
                });
            }
        }
    });
});

// DELETE
// Delete course
router.delete("/delete/:id", (req, res) => {

    // Get the id from id-parameter
    var deleteId = req.params.id;

    // Delete course that matches deleteId
    Course.deleteOne({
        _id: deleteId
    }, (err, singleCourse) => {
        // If there was an error
        if(err) {
            // Send error message
            res.send(err);
        }

        // Send object
        res.send(singleCourse);
    });
});

// Export as module
module.exports = router;