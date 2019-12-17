import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    addBoard: PropTypes.func,
  }

  state = {
    boardName: '',
    boardDescription: '',
    boardPreviewImage: '',
  }

  saveBoardEvent = (event) => {
    const { addBoard } = this.props;

    event.preventDefault();
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      previewImageUrl: this.state.boardPreviewImage,
      uid: authData.getUid(),
    };
    addBoard(newBoard);
    this.setState({ boardName: '', boardDescription: '', boardPreviewImage: '' });
  }

  nameChange = (event) => {
    event.preventDefault();
    this.setState({ boardName: event.target.value });
  }

  descriptionChange = (event) => {
    event.preventDefault();
    this.setState({ boardDescription: event.target.value });
  }

  imgPreviewChange = (event) => {
    event.preventDefault();
    this.setState({ boardPreviewImage: event.target.value });
  }

  render() {
    return (
      <form className='col-6 offset-3 BoardForm'>
        <div className="form-group">
          <label htmlFor="order-name">Board Name:</label>
          <input
            type="text"
            className="form-control"
            id="board-name"
            placeholder="Enter board name"
            value={this.state.boardName}
            onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description-name">Board Description:</label>
          <input
            type="text"
            className="form-control"
            id="board-description"
            placeholder="Enter board description"
            value={this.state.boardDescription}
            onChange={this.descriptionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image-name">Preview Image:</label>
          <input
            type="text"
            className="form-control"
            id="board-preview"
            placeholder="Enter preview image URL"
            value={this.state.boardPreviewImage}
            onChange={this.imgPreviewChange}
          />
        </div>
        <button className="btn btn-secondary" onClick={this.saveBoardEvent}>Save Board</button>
      </form>
    );
  }
}

export default BoardForm;
