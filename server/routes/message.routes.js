const express = require("express");
const router = express.Router();
const pusher = require('../utils/pusher')



router.get("/",async(req,res)=>{
    try {
        pusher.trigger("my-channel", "my-event", {
            message: "hello world"
          })
        res.send("dddd")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
