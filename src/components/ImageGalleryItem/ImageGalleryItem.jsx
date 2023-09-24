import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = () => {
  return (
    <li class={css.galleryItem}>
      <img class={css.galleryItem__image} src="" alt="" />
    </li>
  );
};
