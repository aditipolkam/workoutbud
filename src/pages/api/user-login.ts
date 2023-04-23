import { NextApiRequest, NextApiResponse } from "next"
import { admin, db } from "@/config/firebaseAdmin";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  const { accessToken } = JSON.parse(req.body);
  admin.auth().verifyIdToken(accessToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    // Use the uid to get the user's information from Firestore
    return admin.firestore().collection('users').doc(uid).get();
  })
  .then((doc) => {
    if (doc.exists) {
      const userData = doc.data();
      console.log(userData);
      res.status(200).json({ data: userData  })
    } else {
      console.log("User document not found");
      res.status(404).json({ message: "User document not found."  })
    }
  })
  .catch((error) => {
    // Handle the case where the token is invalid or expired
    res.status(401).json({ message: "Invalid or expired token."  })
    console.error("Error verifying token:", error);
  });
}