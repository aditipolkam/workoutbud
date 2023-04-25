import { NextApiRequest, NextApiResponse } from "next"
import { admin, db} from "@/config/firebaseAdmin";
import { ACTIVITIES_COLLECTION } from "@/config/dbVars";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try{
    const { location , radius } = req.body;
    console.log("this",location, radius)
    if(!location || !radius)
        res.status(400).json({message:"Body empty"})

    const snapshot = await db.collection(ACTIVITIES_COLLECTION).get()
    if(!snapshot) res.status(404).json({message:"Nothing found"})
    const documents =  snapshot.docs.map(doc => doc.data());
    if(documents.length == 0) res.status(404).json({message:"Nothing found"})
    res.status(200).json(documents)
  }
  catch(error:any){
    res.status(401).json({ message: error.message  })
  }
}