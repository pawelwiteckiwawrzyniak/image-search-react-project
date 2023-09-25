import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, id }) => {
  return (
    <img className={css.galleryItem__image} src={webformatURL} id={id} alt="" />
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  id: PropTypes.number,
};
