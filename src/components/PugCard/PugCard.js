import React, { Component } from 'react';
import './PugCard.scss'

export default class PugCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.image = React.createRef();
  }

  componentDidMount() {
    const img = this.image.current;
    if (img && img.complete) {
      this.onImageLoaded();
    }
  }

  onImageLoaded = () => {
    if (this.state.loading) {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className={`card ${this.state.loading ? 'hidden' : 'card-transition' }`}>
        <img
          alt={`${this.props.breed} ${this.props.number}`}
          ref={this.image} src={this.props.src}
          onLoad={this.onImageLoaded}/>
      </div>
    )
  }
}
