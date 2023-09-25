import css from './App.module.css';
import axios from 'axios';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Component } from 'react';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentPage: 1,
    searchQuery: '',
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
        return { images: [...state.images, ...imageList] };
      });

      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 1000);
    } catch (error) {
      this.setState({ isLoading: false });
      console.error(error);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    this.setState(state => ({
      currentPage: 1,
      searchQuery: searchQuery,
      images: [],
    }));
  };

  handleClick = () => {
    this.setState(state => {
      return {
        currentPage: state.currentPage + 1,
      };
    });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.handleSubmit}></Searchbar>
        {/* {isLoading && <ContentLoader />} */}
        {this.state.searchQuery !== '' && (
          <ImageGallery images={this.state.images}></ImageGallery>
        )}
        {this.state.images.length >= 12 && (
          <Button handleClick={this.handleClick}></Button>
        )}
      </div>
    );
  }
}
