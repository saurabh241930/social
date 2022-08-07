const express = require("express");
const router = express.Router();
const pusher = require('../utils/pusher')
const Message = require('../models/message.model')



router.get("/", async (req, res) => {
    try {
        pusher.trigger("my-channel", "my-event", {
            message: "hello world"
        })
        res.send("dddd")
    } catch (error) {
        console.log(error);
    }
})

router.get("/ofuser/:relativeUserId", async (req, res) => {
    try {
        const relativeUserId = req.params.relativeUserId;
        const userId = req.user._id;
        const messages = await Message.find({
            'userId': { $in: [relativeUserId, userId] },
            'relativeUserId': { $in: [relativeUserId, userId] }
        }).sort({ createdAt: -1 }).populate("relativeUserId").exec();
        if (!messages) {
            return res.status(404).json({
                message: "The messages you were looking for is not available.",
            });
        }

        res.status(200).json({
            message: "Messages fetched successfully.",
            response: {
                messages,
            },
        });

    } catch (error) {
        console.log(error);
    }
})


router.get("/all", async (req, res) => {
    try {
        const userId = req.user._id;
        const messages = await Message.find({ 'userId': userId }).sort({ createdAt: -1 }).populate("relativeUserId").exec();;
        if (!messages) {
            return res.status(404).json({
                message: "The messages you were looking for is not available.",
            });
        }

        res.status(200).json({
            message: "Messages fetched successfully.",
            response: {
                messages,
            },
        });

    } catch (error) {
        console.log(error);
    }
})





router.post("/send", async (req, res) => {
    try {
        const relativeUserId = req.body.relativeUserId;
        const userId = req.user._id;
        const messageText = req.body.messageText

        const message = await new Message({ userId, relativeUserId, messageText });
        await message.save();
        res.status(201).json({
            message: "message created successfully.",
            response: {
                message,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong.",
            error: error.message,
        });
    }
});


module.exports = router;
