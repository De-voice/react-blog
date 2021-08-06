const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const multer = require("multer");
 require("dotenv").config();



const app = express();
const PORT = process.env.Port || 5000;

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex:true})
     .then(console.log("database connected"))
     .catch(err => console.log("err",err));


     const storage = multer.diskStorage({
         destination:(req,file,cb) => {
             cb(null,"images")
         },
         filename:(req,file,cb) => {
             cb(null,req.body.name)
         }
     });


     const upload = multer({storage:storage});

     app.post("/api/upload",upload.single("file"),(req,res) => {
         res.status(200).json("File has been uploaded")
     });

// middlewares
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})