import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nasi_Goreng-Lombok.JPG/1024px-Nasi_Goreng-Lombok.JPG',
        address: "Some address 5, 12345 Some City",
        description: 'This is a first meetup'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Risotto_de_gambas%2C_restaurant_Danieli_%28Vienne%2C_Autriche%29.jpg/1024px-Risotto_de_gambas%2C_restaurant_Danieli_%28Vienne%2C_Autriche%29.jpg',
        address: "Some address 5, 12345 Some City",
        description: 'This is a second meetup'
    },
]

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
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        revalidate: 1
    };
}

export default HomePage;