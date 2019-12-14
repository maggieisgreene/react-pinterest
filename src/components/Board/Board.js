import React from 'react';

import boardShape from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
  }

  render() {
    const { board } = this.props;

    return (
      <div className="Board col-4">
        <div className="card">
          <div className="card-body">
            <img src={board.previewImageUrl} className="card-img-top boardImg" alt={board.name} />
            <h5 className="card-title">{board.name}</h5>
            <p className="card-text">{board.description}</p>
            <button className="btn btn-light">View Pins</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;