import React, { Component } from 'react';
import './Toolbar.scss'
import filterIcon from '../../icons/filter.svg';

export default class Toolbar extends Component {
  render() {
    return <div className="toolbar">
      <h1 className="toolbar-header">Infinite Pugs!</h1>
      <div className="toolbar-actions">
        <button className="toolbar-action-button" type="button" onClick={this.props.onActionClick}>
          <img src={filterIcon} alt="Filter Icon"/>
          <span>Filter</span>
        </button>
      </div>
    </div>
  }
}
