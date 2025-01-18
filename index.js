/*const express=require("express");
require("./db/con");
const router =require("./routes/router");
const app=express();
const port=3001;
const cors=require("cors");
//front end port is 3000 and backend port is in 8000 so error occur.so cors (cross origin reaource ) is used
//to reduce error

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/uploads",express.static("./uploads"));//to display all images from uploads
app.listen(port,()=>{
    console.log(`server start at port no ${port}`)
})
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json({limit:"10mb"}))
const schema=mongoose.Schema(
    {
        image:String
    })
const imageModel=mongoose.model("sais",schema)
app.get("/getImg",async(req,res)=>{
    const data=await imageModel.find({})
    res.json({message : "Server is running",data:data})
})
app.post("/upload",async(req,res)=>{
    console.log(req.body)
    res.send({message:"image uploaded successfully",success:true})
    const image=new imageModel({
        image:req.body.img
    })
    await image.save()
})

mongoose.connect("mongodb+srv://lahiri:sai*123@cluster0.r7eze9l.mongodb.net/Sai?retryWrites=true&w=majority&appName=Cluster0")
app.listen(3001,()=>console.log("Server is Runnig"))*/
// Import necessary modules and models
/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const userRoutes=require("./models/userRoutes")
const EmployeeModel = require('./models/Employee');
const NotesModel = require('./models/userSchema');

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://lahiri:sai*123@cluster0.r7eze9l.mongodb.net/Sai?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Employee login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("successful");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("Email is not registered");
      }
    });
});

// Employee signup route
app.post('/sign', async (req, res) => {
  const { username, email, password,mobile, isRGUKTian, RGUKTianID } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (user) {
      res.status(200).json({ message: 'Email already registered' });
    } else {
      EmployeeModel.create(req.body)
        .then(res.status(200).json({ message: "Signup Successful" }))
        .catch(err => res.json(err));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define file schema for both projects and notes
const fileSchema = new mongoose.Schema({
  email: String,
  image: String,
  pdf: String,
  description: String
});

// Create models for projects and notes
const FileModel = mongoose.model("filepdfs", fileSchema);

// Multer configuration for file upload


// Route for getting files based on email and category
app.get('/getImg', async (req, res) => {
  const { email, category } = req.query;
  try {
    let data;
    switch (category) {
      case 'projects':
        data = await FileModel.find({});
        break;
      case 'notes':
        data = await NotesModel.find({});
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid category' });
    }
    res.json({ success: true, message: 'Data retrieved successfully', data: data });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specify the directory where you want to store the files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name for storage
  }
});

const upload = multer({ storage: storage });

// Route for handling file uploads for both projects and notes
app.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  try {
    const { email, description } = req.body;
    const imageFile = req.files['image'][0]; // Get the image file object
    const pdfFile = req.files['pdf'][0]; // Get the PDF file object

    // Save the file details to the database
    await FileModel.create({
      email: email,
      image: imageFile.filename, // Save the file name or path to the image field
      pdf: pdfFile.filename, // Save the file name or path to the pdf field
      description: description
    });

    res.status(200).json({ success: true, message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/uploadNotes', upload.single('pdf'), async (req, res) => {
  try {
    const { year, branch, subject, description, email } = req.body;
    const pdfFile = req.file; // Access the uploaded PDF file

    // Save the notes details to the database
    await NotesModel.create({
      email: email,
      pdf1: pdfFile.filename, // Save the file name or path to the pdf field
      year: year,
      branch: branch,
      subject: subject,
      description: description
    });

    res.status(200).json({ success: true, message: 'Notes uploaded successfully' });
  } catch (error) {
    console.error('Error uploading notes:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.use("/api/user",userRoutes)

// Start the server
const PORT = process.env.PORT || 15675;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/
/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const savedOTPS = {};

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'sailahiri13@gmail.com',
        pass: 'xhfp vxix dkxo ypqj'
    }
});

app.post('/sendotp', (req, res) => {
    const email = req.body.email;
    const digits = '0123456789';
    const limit = 4;
    let otp = '';

    for (let i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }

    const mailOptions = {
        from: 'sailahiri13@gmail.com',
        to: email,
        subject: "Testing node emails",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send("Couldn't send OTP");
        } else {
            savedOTPS[email] = otp;
            setTimeout(() => {
                delete savedOTPS[email];
            }, 60000);
            res.status(200).send("Sent OTP");
        }
    });
});

app.post('/verify', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
      return res.status(400).json({ error: "Missing email or OTP" });
  }

  if (savedOTPS.hasOwnProperty(email)) {
      const savedOTP = savedOTPS[email];

      if (otp === savedOTP) {
          // Clear the saved OTP after successful verification
          delete savedOTPS[email];
          return res.status(200).json({ message: "Verified" });
      } else {
          return res.status(400).json({ error: "Invalid OTP" });
      }
  } else {
      return res.status(400).json({ error: "Email not found" });
  }
});


app.listen(9876, () => {
    console.log("Server started on port 9876");
});*/
/*mongodb+srv://lahiri:<password>@cluster0.r7eze9l.mongodb.net/*/
require("dotenv").config();
const mongoose = require('mongoose');
const multer=require('multer');
const express=require("express");
const EmployeeModel=require("./models/User");
const FileModel=require("./models/Project");
const Profile=require("./models/Profile");
const Profile1=require("./models/Profile1");
const NotesModel=require("./models/userSchema");
const User=require('./models/User');
const Image=require("./models/Image");
const NotesModel1=require("./models/Record");
const FileModel1=require("./models/Message");
const Contact=require('./models/Contact');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app=express()
const cors=require("cors");
const path = require('path');
const fs = require('fs');
const router=require("./routes/router")
const PORT=19889;
mongoose.connect("mongodb+srv://lahiri:sai*123@cluster0.r7eze9l.mongodb.net/Sai?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => {
console.log("MongoDB connected successfully");
}).catch(err => {
console.error("MongoDB connection error:", err);
});

app.use(express.json())
app.use(cors());
app.use(router);
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
  .then(user => {
  if (user) {
  if (user.password === password) {
  res.json("successful");
  } else {
  res.json("password is incorrect");
  }
  } else {
  res.json("Email is not registered");
  }
  });
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
});
app.get('/getImg', async (req, res) => {
  const { category, year, branch, subject } = req.query;
  try {
    let data;
    switch (category) {
      case 'projects':
        data = await FileModel.find({}); 
        break;
        case 'notes':
          if (year && branch && subject) {
            
            data = await NotesModel.find({ year: year, branch: branch, subject: subject }).limit(20);
          } else if (year  && subject) {
          
            data = await NotesModel.find({ year: year, subject: subject }).limit(20);
          }
          else {
   
            data = await NotesModel.find({}).limit(20);
          }
          break;
      case 'records':
        if (year && branch && subject) {
        
          data = await NotesModel1.find({ year: year, branch: branch, subject: subject }).limit(20);
        }
        else if (year  && subject) {
         
          data = await NotesModel1.find({ year: year, subject: subject }).limit(20);
        }
        else {
        
          data = await NotesModel1.find({}).limit(20);
        }
        break;
      case 'arts':
          data=await Image.find({})
          break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid category' });
    }
    res.json({ success: true, message: 'Data retrieved successfully', data: data });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.get('/admin', async (req, res) => {
 
  try {
   
    data = await Contact.find({}); 
    res.json({ success: true, message: 'Data retrieved successfully', data: data });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const upload = multer({ storage: storage });
app.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  try {
    const { email, description,title } = req.body;
    const imageFile = req.files['image'][0]; 
    const pdfFile = req.files['pdf'][0]; 
    await FileModel.create({
      email: email,
      image: imageFile.filename, 
      pdf: pdfFile.filename, 
      description: description,
      title:title
    });

    res.status(200).json({ success: true, message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
const storage0 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  const filetypes = /pdf|docx|doc|pptx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only PDF, DOCX, DOC, and PPTX files are allowed');
  }
};

const upload8 = multer({
  storage: storage0,
  fileFilter: fileFilter
});

app.post('/uploadNotes', upload8.single('file'), async (req, res) => {
  try {
    const { year, branch, subject, description, email } = req.body;
    const filePath = req.file.path.replace('uploads/', '');
    await NotesModel.create({
      email: email,
      pdf1: filePath, 
      year: year,
      branch: branch,
      subject: subject,
      description: description
    });
        res.setHeader('Content-Disposition', 'inline');

    res.status(200).json({ success: true, message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
const upload9 = multer({ storage: storage0})
app.post('/uploadart', upload9.single('image'), async (req, res) => {
  try {
    const { email } = req.body;
    const pdfPath = req.file.path.replace('uploads/', ''); 
    await Image.create({
      email: email,
      image:pdfPath , 
    });

    res.status(200).json({ success: true, message: 'image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading notes:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.post('/uploadrecord', upload.single('pdf'), async (req, res) => {
  try {
    const { year, branch, subject, description, email } = req.body;
    const pdfFile = req.file; // Access the uploaded PDF file

    await NotesModel1.create({
      email: email,
      pdf1: pdfFile.filename,
      year: year,
      branch: branch,
      subject: subject,
      description: description
    });

    res.status(200).json({ success: true, message: 'Notes uploaded successfully' });
  } catch (error) {
    console.error('Error uploading notes:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.post('/profile', upload.single('image'), async (req, res) => {
  try {
    const pdfFile = req.file; 
    const { email } = req.body;

    let user = await Profile.findOne({ email });

    if (user) {
     
      user = await Profile.findOneAndUpdate(
        { email },
        { $set: { image: pdfFile.filename } },
        { new: true }
      );
      return res.status(200).json({ success: true, message: 'Profile image updated successfully' });
    } else {
     
      await Profile.create({ image: pdfFile.filename, email:email });
      return res.status(200).json({ success: true, message: 'Profile uploaded successfully' });
    }
  } catch (error) {
    console.error('Error uploading or updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.post('/profile1', upload.single('image'), async (req, res) => {
  try {
    const pdfFile = req.file; 
    const { email,name,password,mobile } = req.body;

    let user = await Profile1.findOne({ email });

    if (user) {
     
      user = await Profile1.findOneAndUpdate(
        { email },
        { $set: { image: pdfFile.filename } },
        {$set:{name:name}},
        {$set:{password:password}},
        {$set:{mobile:mobile}},
        { new: true }
      );
      return res.status(200).json({ success: true, message: 'Profile image updated successfully' });
    } else {
     
      await Profile1.create({ image: pdfFile.filename, email:email,password:password,mobile:mobile,name:name });
      return res.status(200).json({ success: true, message: 'Profile uploaded successfully' });
    }
  } catch (error) {
    console.error('Error uploading or updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.get('/getDetails/:email', async (req, res) => {
  try {
      const { email } = req.params;
      const user = await User.findOne({ email });

      if (!user || !user.image) {
          return res.json({ data: [] });
      }
      res.json({ data: [{ email: user.email, image: user.image,fname:user.fname,password:user.password,mobile:user.mobile }] });
  } catch (error) {
      console.error('Error fetching user image:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.get('/get', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await Profile.findOne({ email }); 

    if (!user || !user.image) {
    
      return res.json({ data: [] });
    }
    res.json({ data: [{ email: user.email, image: user.image }] });
  } catch (error) {
    console.error('Error fetching user image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/mes', async (req, res) => {
  try {
    const { Remail, Semail, message } = req.body; 
    console.log('Received message:', { Remail, Semail, message });
    await FileModel1.create({
     Remail:Remail,
     Semail:Semail,
     message:message
    });
    res.status(200).json({ success: true, message: 'Message received successfully' });
  } catch (error) {
    console.error('Error receiving message:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.get('/getmessage', async (req, res) => {
  try {
      const { email } = req.query;
      const threads = {};
      const messages = await FileModel1.find({ $or: [{ Semail: email }, { Remail: email }] });
      messages.forEach(message => {
          const threadKey = message.Semail === email ? message.Remail : message.Semail;
          if (!threads[threadKey]) {
              threads[threadKey] = [];
          }
          threads[threadKey].push(message);
      });

      res.json({ messageThreads: threads });
  } catch (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/getIsRGUKTian/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json({ isRGUKTian: user.isRGUKTian });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/getName/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json({ fname: user.fname });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/sendNotificationEmail', async (req, res) => {
  const { email } = req.body;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    // Configure your email service provider here
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Send notification email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Notification: Check Your Dashboard',
      text: 'You have a new notification from Connect Verse. Please check your dashboard.',
    });
    console.log('Notification email sent successfully');
    res.status(200).json({ message: 'Notification email sent successfully' });
  } catch (error) {
    console.error('Error sending notification email:', error);
    res.status(500).json({ error: 'Error sending notification email' });
  }
});
app.post('/updateProfile', upload9.single('image'), async (req, res) => {
  const { fname, email, password, mobile } = req.body;
  const imageFile = req.file; // Corrected variable name
  if (!fname || !email || !password) {
      return res.status(400).json({ error: "Please Enter All Fields" });
  }
  try {
      let user = await User.findOne({ email: email });
      if (user) {
          user = await User.findOneAndUpdate(
              { email: email },
              { $set: { fname: fname, password: password, mobile: mobile, image: imageFile.filename } },
              { new: true }
          );
          return res.status(200).json({ success: true, message: 'Profile updated successfully' });
      } else {
          return res.status(400).json({ error: "User not found with provided email" });
      }
  } catch (error) {
      return res.status(400).json({ error: "Invalid Details", error });
  }
});
app.post('/contactus', async (req, res) => {
  try {
    const { name, email, subject,description } = req.body;
    const newUser = new Contact({ name, email, subject,description });
    await newUser.save();
    res.status(201).json({ message: 'message sent successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});
app.listen(PORT,()=>{
  console.log(`Server start at ${PORT}`)
})
