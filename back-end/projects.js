const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");
const { time } = require('console');

const User = users.model;

const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    title: String,
    content: Object,
    dateCreated: Date,
    lastEdited: Date,
    lastEditor: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    editorNames: Array,
    ownerID: String,
    edit: Boolean,
});

const Project = mongoose.model('Project', projectSchema);

router.get('/user/:userID', async (req, res) => {
    let projects = [];
    try {
        projects = await Project.find({
            "ownerID": req.params.userID
        }).sort({
            created: -1
        });
        return res.send({
            projects: projects
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const project = new Project({
        user: req.body.user,
        title: req.body.title,
        content: null,
        dateCreated: new Date(),
        lastEdited: new Date(),
        lastEditor: req.body.user,
        editorNames: [req.body.user.username],
        ownerID: req.body.user._id,
        edit: false,
    });
    try {
        await project.save();
        return res.send({
            project: project
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    try {
        project = await Project.findOne({
            _id: req.params.id
        });
        if (req.body.hasOwnProperty("title")) {
            project.title = req.body.title;
        }
        if (req.body.hasOwnProperty("content")) {
            project.content = req.body.content;
        }
        if (req.body.hasOwnProperty("lastEdited")) {
            project.lastEdited = req.body.lastEdited;
        }
        if (req.body.hasOwnProperty("lastEditor")) {
            project.lastEditor = req.body.lastEditor;
        }
        await project.save();
        return res.send({
            project: project
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Project.deleteOne({
            _id: req.params.id
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


module.exports = {
    routes: router
}