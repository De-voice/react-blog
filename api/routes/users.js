const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

const router = express.Router();

router.put("/:id", async (req, res) => {
	if (req.body.userID === req.params.id) {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}

		try {
			const updateUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			);

			res.status(200).json(updateUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(401).json("You can update only account");
	}
});

router.delete("/:id", async (req, res) => {
	if (req.body.userID === req.params.id) {
		try {
            // find the user as to delete all related post
            const user = await User.findById(req.params.id);
			try {
                await Post.deleteMany({username:user.username})
				await User.findByIdAndDelete(req.params.id);
				res.status(200).json("user has been deleted...");
			} catch (err) {
				res.status(500).json("You can delete your account only");
			}

		} catch (err) {
            res.status(404).json("no user is found!")
        }
	} 
    
    else {
		res.status(401).json("You can update only account");
	}
});


router.get("/:id", async (req,res) => {
   try {

    const user = await User.findById(req.params.id)
    const {password,...others} = user._doc;
    
    res.status(200).json(others)
       
   } catch (err) {
        res.status(500).json(err)
   }
});

router.get("/", async (req, res) => {
	try {
		const {password, ...others} = await User.find();
		console.log(others);

		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
        console.log(err);
	}
});

module.exports = router;
