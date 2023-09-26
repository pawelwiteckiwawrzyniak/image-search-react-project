import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  handleModal,
  webformatURL,
  largeImageURL,
  id,
}) => {
  return (
    <img
      className={css.galleryItem__image}
      src={webformatURL}
      largeimage={largeImageURL}
      id={id}
      alt=""
      onClick={handleModal}
    />
  );
};

ImageGalleryItem.propTypes = {
  handleModal: PropTypes.func,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  id: PropTypes.number,
};
