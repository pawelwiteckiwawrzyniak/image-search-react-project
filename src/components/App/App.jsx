import css from './App.module.css';
import axios from 'axios';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentPage: 1,
    searchQuery: '',
    isModalOpen: false,
    selectedImage: '',
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      await this.fetchImages();
    }
  };

  fetchImages = async () => {
    const searchParams = new URLSearchParams({
      key: '38272300-1f1fe77aa9d2a1c8673ac9f3e',
      q: this.state.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.state.currentPage,
      per_page: 12,
    });

    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?${searchParams}`
      );

      const imageList = await response.data.hits;

      this.setState(state => {
        return { images: [...state.images, ...imageList], isLoading: false };
      });

      if (imageList.length === 0) {
        return alert(
          'There are no images left to display with this search query!'
        );
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.error(error);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    if (this.state.searchQuery === searchQuery) {
      return;
    } else {
      this.setState(state => ({
        currentPage: 1,
        searchQuery: searchQuery,
        images: [],
      }));
    }
  };

  handleClick = () => {
    this.setState(state => {
      return {
        currentPage: state.currentPage + 1,
      };
    });
  };

  handleModal = event => {
    const image = event.currentTarget.attributes.largeimage.nodeValue;
    this.setState(state => {
      return { selectedImage: image, isModalOpen: true };
    });
  };

  handleClose = () => {
    this.setState(state => {
      return {
        isModalOpen: false,
        selectedImage: '',
      };
    });
  };

  render() {
    const { isLoading, searchQuery, images, isModalOpen, selectedImage } =
      this.state;
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.handleSubmit} />
        {searchQuery !== '' && (
          <ImageGallery handleModal={this.handleModal} images={images} />
        )}
        {isLoading && <Loader />}
        {images.length >= 12 && <Button handleClick={this.handleClick} />}
        {isModalOpen && (
          <Modal image={selectedImage} handleClose={this.handleClose} />
        )}
      </div>
    );
  }
}
