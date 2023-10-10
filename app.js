//database
const connectDB = require("./db/connect");

// express
const express = require("express");
const app = express();

//multer
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../public/upload')

    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    }

})

const upload = multer({
    storage:storage
})

app.post('/upload', upload.single('image'))

//route
const routes = require("./routes/blog-route");
//port
const port = process.env.PORT || 5000;

//middleware..... is to help us reciev files in json format.....ts a default convert dat comes with express
app.use(express.json());

//if files are coming from d frontend as single files, it helps to sort them and convert to json. its a default convert dat comes with express
app.use(express.urlencoded({ extended: true }));

//route middleware
app.use("/", routes)


const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("App is listening on port " + port);
    });
  } catch (error) {
    console.log("there is error on the server port " + error);
  }
};

start();