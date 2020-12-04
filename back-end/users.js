const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const userSchema = new mongoose.Schema({
    username: String,
});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    return obj;
};

const User = mongoose.model('User', userSchema);


router.post('/', async (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({
            message: "username required"
        });
    }

    try {
        const existingUser = await User.findOne({
            username: req.body.username
        });
        if (existingUser) {
            return res.send({
                user: existingUser
            });
        }

        const user = new User({
            username: req.body.username,
        });
        await user.save();
        return res.send({
            user: user
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/", async (req, res) => {
    try {
        await User.deleteMany({username: req.body.username});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: User,
};
