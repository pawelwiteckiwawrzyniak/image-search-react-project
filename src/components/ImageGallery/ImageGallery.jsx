import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ handleModal, images }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(image => (
        <li className={css.galleryItem} key={image.id}>
          <ImageGalleryItem
            handleModal={handleModal}
            id={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
          ></ImageGalleryItem>
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  handleModal: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
};
