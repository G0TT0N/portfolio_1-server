import {Router} from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// /authApi
router.post("/login", async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json("user not found");
    }

    const isMatchPass = await bcrypt.compare(password, user.password);

    if (!isMatchPass) {
      return res.status(400).json("wrong password or email");
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET + "", {
      expiresIn: "1h",
    });

    res.json({token, userId: user.id});
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/checkToken", (req, res) => {
  const {prevToken} = req.body;

  jwt.verify(prevToken, process.env.JWT_SECRET + "", (err, decoded) => {
    if (err) {
      res.json(false);
    } else {
      res.json({userId: decoded.userId});
    }
  });
});

module.exports = router;
