// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {nickname, gender, activities, time_slots, description} = req.body;
    console.log(req.body)
    if (nickname && gender && activities && time_slots && description) {
      const data = {
        nickname,
        description,
        gender,
        activities: activities.split(",").map(function (value:string) {return value.trim()}),
        timeSlots: time_slots.split(",").map(function (value:string) {return value.trim()}),
      };
      console.log(data);
    } else {
      console.log("error");
    }
  res.status(200).json({ name: 'John Doe' })
}
