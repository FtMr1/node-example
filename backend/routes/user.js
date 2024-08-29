const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");



router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

  router.delete("/:username", async (req, res) => {
    try {
      const username = req.params.username;
  
      const deletedUser = await User.findOneAndDelete({username}
         );
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found." });
      }
  
      res.status(200).json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });
  



  module.exports=router