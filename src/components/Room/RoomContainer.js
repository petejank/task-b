'use strict';

import './assets/room-container.scss';

import React from 'react';

import dataApi from 'other/dataApi';
import Room from './Room';

export default React.createClass({
  getInitialState() {
    return {
      houseData: null
    };
  },
  componentWillMount() {
    dataApi.getRooms().then(houseData => this.setState({houseData}));
  },
  render() {
    return (
      <div className="room-container">
        {
          this.state.houseData ?
            <section>
              <h1 className="room-container__name">{this.state.houseData.houseName}</h1>
              {
                this.state.houseData.rooms.map((room, index) => <Room key={index} {...room}/>)
              }
            </section>
          : <div className="room-container__loader"></div>
        }
      </div>
    );
  }
});
