import React from 'react';
import PropTypes from 'prop-types';

import boardShape from '../../helpers/propz/boardShape';

import './Board.scss';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func,
  }

  // Event to single board
  setSelectedBoardId = (event) => {
    event.preventDefault();
    const { setSingleBoard, board } = this.props;
    setSingleBoard(board.id);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="Board col-3">
        <div className="card">
        <img src={board.previewImageUrl} className="card-img-top boardImg" alt={board.name} />
          <div className="card-body">
            <h5 className="card-title">{board.name}</h5>
            <p className="card-text">{board.description}</p>
            <button className="btn btn-light" onClick={this.setSelectedBoardId}>View Pins</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
