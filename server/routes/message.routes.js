const express = require("express");
const router = express.Router();
const pusher = require('../utils/pusher')
const Message = require('../models/message.model')
const mongoose = require('mongoose')




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
        res.status(500).json({
            message: "something went wrong.",
            error: error.message,
        });
    }
})


router.get("/all", async (req, res) => {
    if(!req.user._id) return res.status(401).json({message: "Please log in"})

    try {

        const messages = await Message.aggregate([
            { $match: { "userId": mongoose.Types.ObjectId(req.user._id) } },
            {
                $group: {
                    _id: "$relativeUserId",
                    last_text: { "$last": "$messageText" },
                    last_senton: { "$last": "$createdAt" }
                }
            },
            {
                $lookup:
                {
                    from: "users", localField: "_id",
                    foreignField: "_id", as: "userdetails"
                }
            }
        ])


        if (!messages) {
            return res.status(404).json({
                message: "The messages you were looking for is not available.",
            });
        }


        res.status(200).json({
            message: "Messages fetched successfully.",
            response: {
                messages
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "something went wrong.",
            error: error.message,
        });
    }
})

router.post("/send", async (req, res) => {
    try {
        const relativeUserId = req.body.relativeUserId;
        const userId = req.user._id;
        const messageText = req.body.messageText

        const message = await new Message({ userId, relativeUserId, messageText });
        await message.save();
        pusher.trigger(relativeUserId.toString(), 'message', messageText);

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
