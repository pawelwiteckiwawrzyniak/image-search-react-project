import css from './App.module.css';
import axios from 'axios';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Component } from 'react';

export class App extends Component {
  state = {
    images: '',
    error: '',
    isLoading: false,
    currentPage: 1,
    searchQuery: '',
  };

  async componentDidMount() {
    await this.getInitialData();
  }

  async componentDidUpdate() {
    await this.getInitialData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const oldState = this.state;

    if (
      nextState.images[0]?.id === oldState.images[0]?.id &&
      nextState.currentPage === oldState.currentPage
    ) {
      return false;
    }

    return true;
  }

  getInitialData = async () => {
    const searchParams = new URLSearchParams({
      key: '38272300-1f1fe77aa9d2a1c8673ac9f3e',
      q: this.state.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.state.currentPage,
      per_page: 12,
    });

    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    try {
      const newImages = await response.data.hits;
      if (this.state.currentPage > 1) {
        await this.setState(state => {
          return { images: state.images.concat(newImages) };
        });
      } else {
        await this.setState(state => {
          return { images: newImages };
        });
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ currentPage: 1 });
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    await this.setState(state => {
      return { searchQuery };
    });
    form.elements.searchQuery.value = '';

    await this.getInitialData();
  };

  handleClick = async () => {
    await this.setState(state => {
      return {
        currentPage: state.currentPage + 1,
      };
    });
  };

  render() {
    const { error, images } = this.state;
    return (
      <div className={css.app}>
        {error && <p>Something went wrong: {error.message}</p>}
        {/* {isLoading && <ContentLoader />} */}
        <Searchbar handleSubmit={this.handleSubmit}></Searchbar>
        {this.state.searchQuery !== '' && (
          <ImageGallery images={images}></ImageGallery>
        )}
        {this.state.images !== '' && (
          <Button handleClick={this.handleClick}></Button>
        )}
      </div>
    );
  }
}
