import css from './App.module.css';
import axios from 'axios';
import { Searchbar } from '../Searchbar/Searchbar';
import { Component } from 'react';

export class App extends Component {
  state = {
    images: [],
    error: '',
    currentPage: 1,
    searchQuery: '',
  };

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
    console.log(response);
    try {
      const images = await response.data.hits;
      console.log(images);
      await this.setState({ images });
      console.log(this.state.images);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.searchQuery.value;
    this.setState({ searchQuery });
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

  render() {
    return (
      <div className={css.app}>
        <Searchbar handleSubmit={this.handleSubmit}></Searchbar>
      </div>
    );
  }
}
