import axios from 'axios';
import PropTypes from 'prop-types';
import Answer from '../src/components/Answer';

const Song = ({ song }) => {
  const handleClick = correct => {
    alert(correct);
  };
  return (
    <div>
      <div className="songText">{song.emojiText}</div>
      <div className="answers">
        {song.answers.map(answer => (
          <Answer key={answer._id} handleClick={handleClick} {...answer} />
        ))}
      </div>
      <style jsx>{`
        .answers {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }
        .songText {
          text-align: center;
          min-height: 30vh;
          border: 1px solid tomato;
          margin-bottom: 3rem;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

Song.getInitialProps = async ({ query }) => {
  const { id } = query;
  const { data } = await axios.get(`http://localhost:3000/api/songs/${id}`);
  console.log(data);
  return { song: data };
};

Song.propTypes = {
  song: PropTypes.shape({
    emojiText: PropTypes.string,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        meta: PropTypes.string,
        correct: PropTypes.bool,
      })
    ),
  }),
};
export default Song;
