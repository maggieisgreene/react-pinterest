import React from 'react';
import PropTypes from 'prop-types';

import pinShape from '../../helpers/propz/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deleteSinglePin: PropTypes.func,
  }

  deletePinEvent = (event) => {
    event.preventDefault();
    const { deleteSinglePin, pin } = this.props;

    deleteSinglePin(pin.id);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-3">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{pin.name}</h5>
            <p className="card-body">{pin.description}</p>
            <button className="btn btn-light" onClick={this.deletePinEvent}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
