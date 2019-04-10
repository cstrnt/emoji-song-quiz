import axios from 'axios';
import Link from 'next/link';
import { convertTextToEmoji } from '../lib/helpers';

const Home = ({ songs }) => {
  const text = convertTextToEmoji('Car egg chicken ball soccer');
  return (
    <div>
      {songs.map(s => (
        <Link key={s.id} href={{ pathname: '/song', query: { id: s.id } }}>
          <a>
            {s.originalText}
            {s.emojiText}
          </a>
        </Link>
      ))}
    </div>
  );
};

Home.getInitialProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/songs');
  return {
    songs: data.data,
  };
};

export default Home;
