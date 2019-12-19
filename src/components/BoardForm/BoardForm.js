import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';
import boardShape from '../../helpers/propz/boardShape';

class BoardForm extends React.Component {
  static propTypes = {
    addBoard: PropTypes.func,
    boardToEdit: boardShape.boardShape,
    editMode: PropTypes.bool,
    updateBoard: PropTypes.func,
  }

  state = {
    boardName: '',
    boardDescription: '',
    boardPreviewImage: '',
  }

  componentDidMount() {
    const { boardToEdit, editMode } = this.props;
    if (editMode) {
      this.setState({ boardName: boardToEdit.name, boardDescription: boardToEdit.description, boardPreviewImage: boardToEdit.previewImageUrl });
    }
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.boardToEdit.id !== this.props.boardToEdit.id) && this.props.editMode) {
      this.setState({ boardName: this.props.boardToEdit.name, boardDescription: this.props.boardToEdit.description, previewImageUrl: this.props.boardToEdit.previewImageUrl });
    }
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

  updateBoardEvent = (event) => {
    event.preventDefault();
    const { updateBoard, boardToEdit } = this.props;

    const updatedBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      previewImageUrl: this.state.boardPreviewImage,
      uid: boardToEdit.uid,
    };
    updateBoard(boardToEdit.id, updatedBoard);
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
    const { editMode } = this.props;

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
        {
          (editMode) ? (<button className="btn btn-secondary" onClick={this.updateBoardEvent}>Update Board</button>)
            : (<button className="btn btn-light" onClick={this.saveBoardEvent}>Save Board</button>)
        }
      </form>
    );
  }
}

export default BoardForm;
