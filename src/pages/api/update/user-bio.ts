import { USER_COLLECTION } from "@/config/dbVars"
import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/config/firebaseAdmin";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {uid, bio} = req.body;
    console.log(uid, bio)
    if(!uid || !bio)
        res.status(400).json({message:"Body empty"})
    const docRef = db.collection(USER_COLLECTION).doc(uid);
    const docSnap = await docRef.get();
    if(!docSnap) res.status(404).json({message:"User not found"})
    else{
        await docRef.update({bio: bio})
        res.status(200).json({ message: "User bio updated" })
    }
}
   