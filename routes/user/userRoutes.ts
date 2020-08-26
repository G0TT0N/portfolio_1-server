import {Router} from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";

const router = Router();

// /userApi
router.post("/createUser", async (req, res) => {
  try {
    const {email, password, name, phone} = req.body;

    const candidate = await User.findOne({email});

    if (candidate) {
      return res.status(400).json("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
    });

    await user.save();

    res.status(201).json(user._id);
  } catch (e) {
    res.status(500).json(e);
  }
});
router.post("/getUserInfo", async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("user not found");
    }

    res.json({email: user.email, name: user.name, phone: user.phone});
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
