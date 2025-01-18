const mongoose = require('mongoose');

// Define the schema for the Project model
const DB="mongodb+srv://lahiri:sai*123@cluster0.r7eze9l.mongodb.net/Sai?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB,
).then(()=>console.log("Database Connected Successfully")).catch((err)=>console.log("error"+err.message))

/*const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String, // Assuming you store file paths or references
        // You might also store file data directly in the database as binary data
    },
    // Add other fields as needed
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Project model using the schema
const Project = mongoose.model('sai', projectSchema);

module.exports = Project;*/