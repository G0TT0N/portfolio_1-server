export {};
const {Router} = require("express");
const User = require("../../models/User.ts");
const bcrypt = require("bcryptjs");

const router = Router();

// /userApi
router.post("/create", async (req, res) => {
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
    });

    await user.save();

    res.status(201).json({success: true});
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
