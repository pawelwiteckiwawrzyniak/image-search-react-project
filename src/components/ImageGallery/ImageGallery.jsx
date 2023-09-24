import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = () => {
  return (
    <ul class={css.imageGallery}>
      <ImageGalleryItem></ImageGalleryItem>
    </ul>
  );
};
