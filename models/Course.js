// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User-schema
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    courseWebsite: {
        type: String,
        required: true
    },
    repo: {
        type: String
    },
    tags: {
        type: String
    },
    color: {
        type: String
    },
    sort: {
        type: Number
    }
});

// Export schema
const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;