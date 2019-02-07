import PropTypes from 'prop-types';
import React from 'react';
import Scoreboard from './Scoreboard';
import Timer from './Timer';

const Board = ({
  addLetter, autofill, definition, letters, longest, timer, reset, round, startTimer, uniques,
}) => (
  <div>
    <table id="board">
      <tr>
        {letters.map((letter, i) => (
          <td>
            {letters[i]}
          </td>))}
      </tr>
    </table>
    <div id="defContainer">
      <span id="word">{definition.word} </span>
      <span id="pos">{definition.pos} </span>
      <span id="def">{definition.def}</span>
    </div>
  </div>
);

Board.propTypes = {
  addLetter: PropTypes.func.isRequired,
  autofill: PropTypes.func.isRequired,
  definition: PropTypes.objectOf(PropTypes.string).isRequired,
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  longest: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  round: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  uniques: PropTypes.number.isRequired,
};
export default Board;
