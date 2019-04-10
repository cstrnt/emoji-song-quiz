import axios from 'axios';
import PropTypes from 'prop-types';

const Song = ({ song }) => (
  <div>
    <div>{song.emojiText}</div>
    {song.answers.map(answer => (
      <div key={answer.songName}>
        <p>{answer.songName}</p>
        <p>{answer.correct.toString()}</p>
      </div>
    ))}
  </div>
);

Song.getInitialProps = async ({ query }) => {
  const { id } = query;
  const { data } = await axios.get(`http://localhost:3000/api/songs/${id}`);
  return { song: data.data };
};

Song.propTypes = {
  song: PropTypes.shape({
    emojiText: PropTypes.string,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        songName: PropTypes.string,
        correct: PropTypes.bool,
      })
    ),
  }),
};
export default Song;
