import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
function MeetupDetails(props) {
  const { meetupData } = props;
  return (
    <MeetupDetail
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
      image={meetupData.image}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin-jeremy:sswoy123@cluster0.id8me.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray(); ////查找並只回傳_id
  client.close();
  return {
    fallback: true, ////提示nextjs我們除了以下產生的路徑,我們還會有更多的valid 網頁
    ////true：直接產生一個空的頁面，同時抓取網頁內容
    ////使用blocking的話,頁面準備好之後才會呈現
    ////確認是否包含了所有的路徑,如果使用false,id:m4會出現404,使用true網址改成m4會出現錯誤
    ///可以預先產生幾頁使用頻率比較高的頁面

    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://admin-jeremy:sswoy123@cluster0.id8me.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
