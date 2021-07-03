const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const roleRouter = require("./routes/roleRouter");
const schoolRouter = require("./routes/schoolRouter");
const studentRouter = require("./routes/studentRouter");

//const config = require('./config');

// const {mongoURI} = require('./keys')

const mongoURI = "mongodb+srv://edtech:TXBxajb_3F7kCG*@cluster0.b52ny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))   
  .catch((err) => console.log(err));

// app.use("/", (req, res)=> {
//   res.json({
//     message: "Hello World!!"
//   })
// })

app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/school", schoolRouter);
app.use("/student", studentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));