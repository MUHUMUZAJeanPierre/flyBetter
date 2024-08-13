import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async(req, res)=>{
    try {
         const {name, email, password} = req.body
         const userExit = await User.findOne({email})
         if(userExit) return res.status(400).json({message: "Email already exists", success: false});
         const user = new User(req.body);
         const hashPassword = bcrypt.hashSync(password, 10);
         user.password = hashPassword;
         await user.save();
         res.status(201).json({message: "User registered successfully", data: user, success: true});
    } catch (error) {
        res.status(500).json({message:"User registration failed", success: false, error: error});
        console.log(error);
        
    }
}
export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password);
            if(isMatch){
                const token = jwt.sign({_id: user._id}, "process env JWT_SECRET");
                res.json({message: "User logged in successfully", data: {token, user}, success: true});
            } else {
                res.status(401).json({message: "Invalid credentials", success: false});
            }
        }else{
            res.status(404).json({message: "User not found", success: false});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "User login failed", success: false, error: error});
        
    }
}