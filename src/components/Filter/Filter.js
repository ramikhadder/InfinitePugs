import React, { Component } from 'react';
import './Filter.scss';
import check from '../../icons/checkmark.svg'

export default class Filter extends Component {
  render() {
    return this.props.show ?
      <div className="filter">
        <button className="filter-chip" onClick={() => this.props.onFilterChange('pug')}>
          {this.props.active === 'pug' ? <img alt="Active Pug Checkmark" src={check}/> : null}
          <span>Pugs</span>
        </button>
        <button className="filter-chip" onClick={() => this.props.onFilterChange('puggle')}>
          {this.props.active === 'puggle' ? <img alt="Active Puggle Checkmark" src={check}/> : null}
          <span>Puggles</span>
        </button>
      </div> : null;
  }
}
