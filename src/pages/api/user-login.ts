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
        return res.status(200).json({ data: userData  })
      } else {
        console.log("User document not found");
        return res.status(404).json({ message: "User document not found."  })
      }
  }
  catch(error){
    res.status(401).json({ message: "Invalid or expired token."  })
    console.error("Error verifying token:", error);
  }
}