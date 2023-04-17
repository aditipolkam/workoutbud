// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { USERCOLLECTION } from '@/config/dbVars';
import { db } from '@/config/firebase';
type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {email, nickname, gender, activities, timeSlots, description} = JSON.parse(req.body);
    console.log(req.body)
    if (nickname && gender && activities && timeSlots && description) {
      const data = {
        email,
        nickname,
        description,
        gender,
        activities,
        timeSlots,
      };
      console.log(data);
      const docRef = doc(db, USERCOLLECTION, email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      }
      else{
        console.log("No such document!");
      }

      res.status(200).json({ message: 'Successfull' })
    } else {
      console.log("error");
    }
  
}
