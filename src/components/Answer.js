/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';

const Answer = ({ meta, correct, handleClick }) => (
  <button type="button" onClick={() => handleClick(correct)}>
    {meta}
    <style jsx>{`
      --abc: 10px;
      button {
        border: 1px solid tomato;
        width: 33%;
        height: 5rem;
        margin: var(--abc);
        background-color: transparent;
        font-size: 1.2rem;
        line-height: 5rem;
      }
      button:hover {
        border: 2px solid tomato;
        margin: calc(var(--abc) - 1px);
        cursor: pointer;
      }
    `}</style>
  </button>
);

Answer.propTypes = {
  meta: PropTypes.string,
  correct: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Answer;
