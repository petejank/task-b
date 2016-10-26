'use strict';

import 'assets/styles/control-row.scss';
import 'assets/styles/control-row-colored.scss';
import './assets/temperature.scss';

import React, {PropTypes} from 'react';
import dataApi from 'other/dataApi';
import Slider from 'rc-slider';

export default React.createClass({
  propTypes: {
    _id: PropTypes.number.isRequired,
    roomId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired
  },
  componentWillMount() {
    this.setState({
      current: this.props.current,
      desiredCurrent: this.props.current,
      min: this.props.min,
      max: this.props.max,
      sliderMarks: getSlideMarkers(this.props)
    });
  },
  onAfterChange(newCurrentTemperature) {
    dataApi.setRoomTemperature(this.props.roomId, this.props._id, newCurrentTemperature).progress(value => {
      this.setState({
        current: value
      });
    });
  },
  render() {
    return (
      <section className="control-row">
        <h3 className="control-row__name control-row__name--long">
          {this.props.name}
        </h3>
        {/* Current temperature */}
        <section className="control-row-colored">
          <h4 className="control-row-long__name">
            Current:
          </h4>
          <div className="control-row-long__box">
            <div className="temperature">
              <Slider min={this.state.min}
                      max={this.state.max}
                      marks={this.state.sliderMarks}
                      className="temperature__slider"
                      disabled={true}
                      value={this.state.current}/>
            </div>
          </div>
        </section>
        {/* Adjustion slider */}
        <section className="control-row-colored">
          <h4 className="control-row-long__name">
            Desired:
          </h4>
          <div className="control-row-long__box">
            <div className="temperature">
              <Slider min={this.state.min}
                      max={this.state.max}
                      marks={this.state.sliderMarks}
                      className="temperature__slider"
                      defaultValue={this.state.desiredCurrent}
                      onAfterChange={this.onAfterChange}/>
            </div>
          </div>
        </section>
      </section>
    );
  }
});

function getSlideMarkers(props) {
  const style = {
    color: '#FFF',
    fontSize: '12px'
  };

  return {
    [props.min]: {
      style: style,
      label: `${props.min}°C`
    },
    [props.max]: {
      style: style,
      label: `${props.max}°C`
    }
  }
}
