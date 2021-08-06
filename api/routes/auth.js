const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req,res) => {
     const {username,email,password,profilePic} = req.body;
    try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            username:username,
            email:email,
            password: hashPassword,
            profilePic:profilePic
        }) 

    const user = await newUser.save();

    res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
});


router.post("/login", async (req,res) => {
     const { username} = req.body;
    
   try {
        const user = await User.findOne({username});
        !user && res.status(400).json("password or username is incorrect");
       const validated = await bcrypt.compare(req.body.password, user.password);
       !validated && res.status(400).json("password or username is incorrect");

       const { password, ...others } = user._doc;

       res.status(200).json(others);
   } catch (error) {
       res.status(500).json(error)
   }
  console.log(req.body)

})



module.exports = router