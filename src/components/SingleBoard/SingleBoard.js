import React from 'react';
import PropTypes from 'prop-types';

import Pin from '../Pin/Pin';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((request) => {
        this.setState({ board: request.data });
        pinData.getPinsByBoardId(selectedBoardId)
          .then((pins) => {
            this.setState({ pins });
          });
      })
      .catch((errFromGetSingleBoard) => console.error(errFromGetSingleBoard));
  }

  removeSelectedBoardId = (event) => {
    event.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  render() {
    const { board, pins } = this.state;

    const pinCard = pins.map((pin) => <Pin key={pin.id} pin={pin} />);

    return (
      <div>
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <div className="d-flex flex-wrap">
            {pinCard}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
