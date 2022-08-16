import { MongoClient } from "mongodb";

////設置類似express的伺服器

async function helper(req, res) {
  if (req.method === "POST") {  
    const data = req.body;  
    const client = await MongoClient.connect(
      "mongodb+srv://admin-jeremy:sswoy123@cluster0.id8me.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result)
    client.close()
    res.status(201).json({message:"Meetup inserted"}) ////假設HTTP狀態為201,接收從資料庫來的訊息
  }
}

export default helper;
