import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";


export const getMe = async (req: AuthRequest, res: Response, next: Function) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
    console.log("error is ", error);
    res.status(500);
    next(error);   
    }
}

export const authCallback = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId: clerkId} = getAuth(req);
        console.log("API here")
        if(!clerkId) {
            return res.status(401).json({ message: 'Unauthorized - invalid token' });
        }
        let user = await User.findOne({clerkId});

        if(!user) {
            const clerkUser = await clerkClient.users.getUser(clerkId);
            user = await User.create({
                clerkId,
                name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ""} ` : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0] || "User",
                email: clerkUser.emailAddresses[0]?.emailAddress || '',
                avatar: clerkUser.imageUrl || '' 
            });
            user = new User({clerkId});
            await user.save();
        }
        res.status(200).json(user); 
    } catch (error) {
        console.log("error is ", error);
        res.status(500);
        next(error);   
    }
}