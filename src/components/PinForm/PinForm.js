import React from 'react';
import PropTypes from 'prop-types';

class PinForm extends React.Component {
  static propTypes = {
    addPin: PropTypes.func,
    selectedBoardId: PropTypes.string,
  }

  state = {
    pinName: '',
    pinImageUrl: '',
    pinDescription: '',
  }

  savePinEvent = (event) => {
    const { addPin, selectedBoardId } = this.props;

    event.preventDefault();
    const newPin = {
      name: this.state.pinName,
      imageUrl: this.state.pinImageUrl,
      siteUrl: this.state.pinImageUrl,
      description: this.state.pinDescription,
      boardId: selectedBoardId,
    };
    addPin(newPin);
    this.setState({ pinName: '', pinImageUrl: '', pinDescription: '' });
  }

  nameChange = (event) => {
    event.preventDefault();
    this.setState({ pinName: event.target.value });
  }

  imagePreviewChange = (event) => {
    event.preventDefault();
    this.setState({ pinImageUrl: event.target.value });
  }

  descriptionChange = (event) => {
    event.preventDefault();
    this.setState({ pinDescription: event.target.value });
  }

  render() {
    return (
        <form className='col-6 offset-3 PinForm'>
          <div className="form-group">
            <label htmlFor="pin-title">Pin Title:</label>
            <input
              type="text"
              className="form-control"
              id="pin-title"
              placeholder="Fall Fashion Inspiration"
              value={this.state.pinName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-image-url">Pin Image Url:</label>
            <input
              type="text"
              className="form-control"
              id="pin-image-url"
              placeholder="https://www.google.com"
              value={this.state.pinImageUrl}
              onChange={this.imagePreviewChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-description">Pin Description:</label>
            <input
              type="text"
              className="form-control"
              id="pin-description"
              placeholder="New pin description..."
              value={this.state.pinDescription}
              onChange={this.descriptionChange}
            />
          </div>
          <button className="btn btn-secondary" onClick={this.savePinEvent}>Add Pin</button>
        </form>
    );
  }
}

export default PinForm;
