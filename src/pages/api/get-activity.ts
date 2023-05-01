import { NextApiRequest, NextApiResponse } from "next"
import { admin, db} from "@/config/firebaseAdmin";
import { ACTIVITIES_COLLECTION } from "@/config/dbVars";
import { Activity } from "@/types";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  console.log("in req")
  try{
    const { id } = req.body;

    if(!id)
        res.status(400).json({message:"Body empty"})

    const snapshot = await db.doc(`${ACTIVITIES_COLLECTION}/${id}`).get()
    
    if(!snapshot) res.status(404).json({message:"Nothing found"})
   
    res.status(200).json({
        id: snapshot.id,
        ...snapshot.data()
      })
  }
  catch(error:any){
    res.status(401).json({ message: error.message  })
  }
}