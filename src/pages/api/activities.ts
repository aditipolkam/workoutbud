import { NextApiRequest, NextApiResponse } from "next"
import { admin, db} from "@/config/firebaseAdmin";
import { ACTIVITIES_COLLECTION } from "@/config/dbVars";
import nearbySort from "nearby-sort";
import haversine from 'haversine';
import { Activity } from "@/types";

function sortOnDistance(radius:any, location:any,mockData:Activity[]){
  const r = Number(radius);
  const currentLocation = {
    "lat": Number(location.lat),
    "long": Number(location.lng)
  };
  // { lat: 18.6161, lng: 73.7286 }
  const docs = nearbySort(currentLocation, mockData.map((v) => {
      return {
          ...v,
          lat: v.location.coordinates.lat,
          long: v.location.coordinates.lng
      }
  }), true).then((res: (Activity & { lat: number, long: number })[]) => {
      console.dir(res, { depth: null, colors: true });
      return res;
  }).then((res) => {
      // filter res by a minimum distance
      return res.filter((v) => {
          return haversine({
              latitude: currentLocation.lat,
              longitude: currentLocation.long
          }, {
              latitude: v.lat,
              longitude: v.long
          }, {
              threshold: r * 1000, // 20 km
              unit: 'meter'
          })
      })
  }).then((res) => {
      // console.log("filtered")
      // console.dir(res, { depth: null, colors: true })
      return res;
      
  });
  return docs;
}


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
    const sortedDocs = await sortOnDistance(radius,location.coordinates,documents as Activity[])
    console.log("sortedDocs",sortedDocs)
    res.status(200).json(sortedDocs)
  }
  catch(error:any){
    res.status(401).json({ message: error.message  })
  }
}