import React from 'react';

import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-4">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{pin.name}</h5>
            <p className="card-body">{pin.description}</p>
            <button className="btn btn-danger" onClick={() => {}}>X</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
