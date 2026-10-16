                                                    //  Create a Server

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const todoModel = require("./models/todo-model");
const userModel = require("./models/user-model");



const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));  //  Middleware

app.use(express.json());  //  Middleware

app.use(cookieParser());  //  Middleware

const upload = multer({ storage: multer.memoryStorage() });  //  Middleware




app.post("/signup", async (req, res) => {

    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please Enter All Details"
        });
    };

    const userAlreadyExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    });

    if (userAlreadyExist) {
        return res.status(409).json({
            message: "User already exist"
        });
    }; 

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "User register successfully",
        user: user
    });

});

app.post("/login", async (req, res) => {

        const {email, password} = req.body; 

        const user = await userModel.findOne({
        $or: [
            {email}
        ]
    });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    };

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    };

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message: "User login successfully"
    });

    });



    app.post("/logout", async (req, res) => {

        res.clearCookie("token");

        res.status(200).json({
            message: "User logout successfully"
        });

    });



                    //  MIDDLEWARE

    const isLoggedIn = (req, res, next) => {

        const token = req.cookies.token;

        if (!token) {

            return res.status(401).json({
                message: "Pleased Login"

            })
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    };



//  POST METHOD

app.post("/create-tasks", isLoggedIn, upload.none(), async(req, res) => {

    // console.log(req.body);

    const task = await todoModel.create({

        title: req.body.title,
        caption: req.body.caption,
        user: req.user.id

    })

    return res.status(201).json({
        message: "Task Created Successfully",
        task: task
    });

});



//   GET METHOD

// app.get("/tasks", async(req, res) => {

//     const tasks = await todoModel.find();

//     return res.status(200).json({
//         message: "Tasks Fetched Successfully",
//         tasks: tasks
//     });

// });



app.get("/tasks", isLoggedIn, async(req, res) => {

    const tasks = await todoModel.find({user: req.user.id});

    return res.status(200).json({
        message: "Tasks Fetched Successfully",
        tasks: tasks
    });

});



//  GET METHOD

// app.get("/tasks/:id", async(req, res) => {

//     const taskId = req.params.id;

//     const task = await todoModel.findById(taskId);

//     return res.status(200).json({
//         message: "Task Fetched Successfully",
//         task: task
//     });

// });



app.get("/tasks/:id", isLoggedIn, async(req, res) => {

    const taskId = req.params.id;

    const task = await todoModel.findOne({_id: taskId, user: req.user.id});

    return res.status(200).json({
        message: "Task Fetched Successfully",
        task: task
    });

});




//  DELETE METHOD

// app.delete("/tasks/:id", async (req, res) => {

//     const taskId = req.params.id;

//     await todoModel.findByIdAndDelete(taskId);

//     res.status(200).json({
//         message: "Task deleted successfully"
//     });

// });



app.delete("/tasks/:id", isLoggedIn, async (req, res) => {

    const taskId = req.params.id;

    await todoModel.findOneAndDelete({_id: taskId, user: req.user.id});

    res.status(200).json({
        message: "Task deleted successfully"
    });

});



//  DELETE METHOD

// app.delete("/multiple-tasks", async (req, res) => {

//     const taskIds = req.body;

//     const result = {_id: {$in: taskIds}};

//     await todoModel.deleteMany(result);

//     res.status(200).json({
//         message: "Task deleted successfully"
//     });

// });



app.delete("/multiple-tasks", isLoggedIn, async (req, res) => {

    const taskIds = req.body;

    const result = {_id: {$in: taskIds}, user: req.user.id};

    await todoModel.deleteMany(result);

    res.status(200).json({
        message: "Task deleted successfully"
    });

});



//  UPDATE METHOD

// app.put("/update-tasks/:id", async (req, res) => {

//     const taskId = req.params.id;
//     const updatedData = req.body;

//     const updatedTask = await todoModel.findByIdAndUpdate(taskId, updatedData, {returnDocument: "after"});

//     return res.status(200).json({
//         message: "Task Updated successfully",
//         updatedTask: updatedTask
//     });

// });



app.put("/update-tasks/:id", isLoggedIn, async (req, res) => {

    const taskId = req.params.id;
    const updatedData = req.body;

    const updatedTask = await todoModel.findOneAndUpdate({_id: taskId, user: req.user.id}, updatedData, {returnDocument: "after"});

    return res.status(200).json({
        message: "Task Updated successfully",
        updatedTask: updatedTask
    });

});

module.exports = app;