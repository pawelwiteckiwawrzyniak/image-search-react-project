import PropTypes from 'prop-types';

export const Button = ({ handleClick }) => {
  <button onClick={handleClick}>Load more</button>;
};

Button.propTypes = {
  handleClick: PropTypes.func,
};
