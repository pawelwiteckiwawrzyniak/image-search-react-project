import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ handleClick }) => (
  <button className={css.button} onClick={handleClick}>
    Load more
  </button>
);

Button.propTypes = {
  handleClick: PropTypes.func,
};
