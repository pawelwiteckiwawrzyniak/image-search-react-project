import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(image => (
        <li className={css.galleryItem} key={image.id}>
          <ImageGalleryItem
            id={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
          ></ImageGalleryItem>
        </li>
      ))}
    </ul>
  );
};
