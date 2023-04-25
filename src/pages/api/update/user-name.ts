import { USER_COLLECTION } from "@/config/dbVars"
import { admin } from "@/config/firebaseAdmin"
import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/config/firebaseAdmin";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {uid, name} = req.body;
    console.log(uid, name)
    if(!uid || !name)
        res.status(400).json({message:"Body empty"})
    const docRef = db.collection(USER_COLLECTION).doc(uid);
    const docSnap = await docRef.get();
    if(!docSnap) res.status(404).json({message:"User not found"})
    else{
        await docRef.update({name: name})
        res.status(200).json({ message: "User name updated" })
    }
}
   