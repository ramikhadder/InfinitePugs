import React, { Component } from 'react';
import './App.scss';
import PugCard from './components/PugCard/PugCard';
import Filter from './components/Filter/Filter';
import Toolbar from './components/Toolbar/Toolbar';
import DogsService from './services/dogs';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      isLoading: false,
      activeFilter: null,
      showFilter: false
    };
    this.dogsService = new DogsService();
    this.pugWrapperRef = React.createRef();

    window.onscroll = () => {
      if (this.state.isLoading) {
        return
      }
      if (window.innerHeight + document.documentElement.scrollTop >= this.pugWrapperRef.current.offsetHeight) {
        this.loadMoreDogs()
      }
    };
  }

  componentDidMount() {
    this.loadMoreDogs();
  }

  loadMoreDogs = () => {
    if (this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true }, async () => {
      const moreDogs = await (this.state.activeFilter === 'puggle' ? this.dogsService.getMorePuggles() : this.dogsService.getMoreDogs());
      this.setState(state => ({
        isLoading: false,
        dogs: [...state.dogs, ...moreDogs]
      }));
    })
  };

  handleFilterChange = (type) => {
    this.setState(state => ({ activeFilter: state.activeFilter !== type ? type : null }));
  };

  filterDog = (dog) => {
    if (this.state.activeFilter === null) {
      return true;
    }
    return dog.breed === this.state.activeFilter;
  };

  render() {
    return (
      <div className="app">
        <Toolbar onActionClick={() => this.setState(state => ({ showFilter: !state.showFilter }))}/>
        <Filter show={this.state.showFilter} active={this.state.activeFilter} onFilterChange={this.handleFilterChange}/>
        <div className={`pug-container ${this.state.showFilter ? 'pug-container--filter-open' : ''}`}>
          <div className="pug-wrapper" ref={this.pugWrapperRef}>
            {this.state.dogs.filter(this.filterDog).map((dog, index) =>
              <PugCard key={index} src={dog.src} breed={dog.breed} number={index + 1}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}
