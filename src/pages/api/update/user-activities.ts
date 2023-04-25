import { USER_COLLECTION, ACTIVITIES_COLLECTION } from "@/config/dbVars"
import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/config/firebaseAdmin";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {uid, activities} = req.body;
    
    if(!uid || !activities)
        res.status(400).json({message:"Body empty"})

    const docRef = db.collection(USER_COLLECTION).doc(uid);
    const docSnap = await docRef.get();
    if(!docSnap) res.status(404).json({message:"User not found"})
    else{
        const userData = docSnap.data()
        if(!userData) res.status(404).json({message:"User found but no data"})
        const actRef = db.collection(ACTIVITIES_COLLECTION)

        let actIds = await Promise.all(activities.map(async(act:any)=> {
            const doc = await actRef.add(act)
            return(doc.id)
        }))
        console.log(actIds)
        await docRef.update({activities: actIds})
        res.status(200).json({ message: "User activities updated" })
    }

    

}
   