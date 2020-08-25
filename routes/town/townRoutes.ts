import {Router} from "express";
import Town from "../../models/Town";

const router = Router();

// /townApi
router.get("/getTownList", async (req, res) => {
  try {
    const townList = await Town.find();
    res.status(200).json(townList);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
