import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, id }) => {
  return (
    <img className={css.galleryItem__image} src={webformatURL} id={id} alt="" />
  );
};
