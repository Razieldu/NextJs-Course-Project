import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import  Head  from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    
    <Fragment>
      <Head>
        <title>React Meetups</title> 
        <meta 
         name="description" 
         content="meet a lot of new friends"
        /> 
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-jeremy:sswoy123@cluster0.id8me.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();
  ///返回一個object
  return {
    props: {
      ////等同於props
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        id: meetup._id.toString(),
        image: meetup.image,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
