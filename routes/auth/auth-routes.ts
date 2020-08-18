export {};
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

// /authApi
router.post("/register", async (req: any, res: any) => {
  try {
    const {email, password} = req.body;

    const candidate = await User.findOne({email});

    if (candidate) {
      return res.status(400).json({message: "user already exist"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      created: new Date(),
    });

    await user.save();

    res.status(201).json({success: true});
  } catch (e) {
    res.status(500).json({message: "new error", e});
  }
});

module.exports = router;
