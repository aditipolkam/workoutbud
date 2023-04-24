import { NextApiRequest, NextApiResponse } from "next"
import { admin} from "@/config/firebaseAdmin";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try{
    const { accessToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(accessToken)
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    console.log(email);
  
    const doc = await admin.firestore().collection('users').doc(uid).get();
      if (doc.exists) {
        const userData = doc.data();
        console.log(userData);
        return res.status(200).json({ data: {uid} })
      } else {
        console.log("User document not found");
        //add doc to firebase
        await admin.firestore().collection('users').doc(uid).set({
          email: email,
        })
        return res.status(201).json({ data: {uid}})
      }
  }
  catch(error){
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token."  })
  }
}