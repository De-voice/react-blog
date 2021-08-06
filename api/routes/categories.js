const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.post("/", async (req,res) => {
  try {
       const newCategory = new Category(req.body);
     const savedCategory = await newCategory.save();

     res.status(200).json(savedCategory)

  } catch (err) {
      res.status(500).json(err)
  }
});




router.get("/", async (req, res) => {
	try {
		const cats = await Category.find();

		res.status(200).json(cats);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
