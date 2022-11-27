import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>

    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://mguser:mgpassword@cluster0.gqwtfbs.mongodb.net/meetups?retryWrites=true&w=majority"
    )
    const db = client.db('meetups');
    const meetupsCollection = db.collection('meetups');

    const allMeetupsIds = await meetupsCollection.find({}, {_id: 1}).toArray();

    await client.close();
    return {
        fallback: false,
        paths: allMeetupsIds.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    // fetch data for single meetup
    const client = await MongoClient.connect(
        "mongodb+srv://mguser:mgpassword@cluster0.gqwtfbs.mongodb.net/meetups?retryWrites=true&w=majority"
    )
    const db = client.db('meetups');
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.data.title,
                address: selectedMeetup.data.address,
                image: selectedMeetup.data.image,
                description: selectedMeetup.data.description
            }
        }
    }
}

export default MeetupDetails;