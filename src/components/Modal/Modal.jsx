import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleClose);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleClose);
  };

  handleClose = event => {
    if (event.key === 'Escape') {
      this.props.handleClose();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.props.handleClose}>
        <div className={css.modal}>
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  handleClose: PropTypes.func,
  image: PropTypes.string,
};
