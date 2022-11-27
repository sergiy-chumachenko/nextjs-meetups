import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";

function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([]);
    // useEffect(() => {
    //     // send a http request and fetch data
    //     //
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);

    return (
        <MeetupList meetups={props.meetups}/>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // fetch data from an API/database
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

export async function getStaticProps() {
    // fetch data from an API/database
    const client = await MongoClient.connect(
        "mongodb+srv://mguser:mgpassword@cluster0.gqwtfbs.mongodb.net/meetups?retryWrites=true&w=majority"
    )
    const db = client.db('meetups');
    const meetupsCollection = db.collection('meetups');

    const allMeetups = await meetupsCollection.find().toArray();
    await client.close();
    console.log(allMeetups);

    return {
        props: {
            meetups: allMeetups.map(meetup => ({
                title: meetup.data.title,
                address: meetup.data.address,
                image: meetup.data.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}

export default HomePage;