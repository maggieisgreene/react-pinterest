import React from 'react';
import PropTypes from 'prop-types';

import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

import boardData from '../../helpers/data/boardData';
import pinData from '../../helpers/data/pinData';

import './SingleBoard.scss';

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

  getPinData = (selectedBoardId) => {
    pinData.getPinsByBoardId(selectedBoardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((errFromGetPins) => console.error({ errFromGetPins }));
  }

  addPin = (newPin) => {
    const { selectedBoardId } = this.props;

    pinData.savePin(newPin)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((errFromSavePin) => console.error(errFromSavePin));
  }

  deleteSinglePin = (pinId) => {
    const { selectedBoardId } = this.props;

    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(selectedBoardId);
      })
      .catch((errFromDeletePin) => console.error({ errFromDeletePin }));
  }

  removeSelectedBoardId = (event) => {
    event.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  render() {
    const { board, pins } = this.state;
    const { selectedBoardId } = this.props;

    const pinCard = pins.map((pin) => <Pin key={pin.id} pin={pin} deleteSinglePin={this.deleteSinglePin} addPin={this.addPin} selectedBoardId={selectedBoardId} />);

    return (
      <div>
        <PinForm addPin={this.addPin} selectedBoardId={selectedBoardId} />
        <div className="SingleBoard">
          <div className="singleBoardHeader d-flex justify-content-between">
            <h3>{board.name}</h3>
            <button className="btn btn-light" onClick={this.removeSelectedBoardId}>Go Back</button>
          </div>
          <div className="d-flex flex-wrap">
            {pinCard}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
