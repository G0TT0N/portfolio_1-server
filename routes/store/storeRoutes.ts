import {Router} from "express";
import Protein from "../../models/Protein";

const router = Router();

// /storeApi

router.get("/getProteins", async (req, res) => {
  res.json(await Protein.find().lean());
});

module.exports = router;
