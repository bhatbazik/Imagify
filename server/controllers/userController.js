import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({sucesss: false  ,message:"Please provide all the details"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({name, email, password: hashedPassword});
        const user = await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({sucesss: true, user:{name:user.name}, token});
        
    }catch(error){
        console.log(error);
        return res.status(500).json({sucesss: false, message: error.message});
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({sucesss: false, message: "Please provide all the details"});
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({sucesss: false, message: "User not found"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({sucesss: false, message: "Invalid password"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        return res.status(200).json({sucesss: true, user:{name:user.name}, token});
    }catch(error){
        console.log(error);
        return res.status(500).json({sucesss: false, message: error.message});
    }
}
const userCredits = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        return res.status(200).json({sucesss: true, credits: user.creditBalance, user:{name:user.name}});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({sucesss: false, message: error.message});
    }
} 

export  {registerUser, loginUser, userCredits};

