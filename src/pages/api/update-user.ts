// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {nickname, gender, activities, timeSlots, description} = req.body;
    console.log(req.body)
    if (nickname && gender && activities && timeSlots && description) {
      const data = {
        nickname,
        description,
        gender,
        activities,
        timeSlots,
      };
      console.log(data);
      res.status(200).json({ message: 'Successfull' })
    } else {
      console.log("error");
    }
  
}
