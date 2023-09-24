import PropTypes from 'prop-types';
import css from './Buttons.module.css';

export const Button = ({ handleClick }) => (
  <button className={css.button} onClick={handleClick}>
    Load more
  </button>
);

Button.propTypes = {
  handleClick: PropTypes.func,
};
