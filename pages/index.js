import axios from 'axios';
import Link from 'next/link';
import { convertTextToEmoji } from '../src/lib/helpers';

const Home = ({ songs }) => {
  const text = convertTextToEmoji('Car egg chicken ball soccer');
  return (
    <div>
      {songs.map(song => (
        <Link
          key={song._id}
          href={{ pathname: '/song', query: { id: song._id } }}
        >
          <a>
            {song.originalText}
            {song.emojiText}
          </a>
        </Link>
      ))}
    </div>
  );
};

Home.getInitialProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/songs');
  return {
    songs: data,
  };
};

export default Home;
