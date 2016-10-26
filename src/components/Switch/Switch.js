'use strict';

import 'assets/styles/control-row.scss';
import './assets/switch.scss';

import React, {PropTypes} from 'react';
import dataApi from 'other/dataApi';
import switchStatus from './switchStatus';
import Switch from 'rc-switch';

export default React.createClass({
  propTypes: {
    _id: PropTypes.number.isRequired,
    roomId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  },
  componentWillMount() {
    this.setState({
      active: this.props.active
    });
  },
  onChange() {
    dataApi.toggleRoomSwitch(this.props.roomId, this.props._id).then(active => {
      this.setState({active});
    });
  },
  render() {
    return (
      <section className="control-row">
        <h3 className="control-row__name">
          {this.props.name}
        </h3>
        <div className="control-row__status">
          {this.state.active ? switchStatus[this.props.group].on : switchStatus[this.props.group].off}
        </div>
        <div className="control-row__button">
          <Switch onChange={this.onChange} checked={this.state.active}/>
        </div>
      </section>
    );
  }
});
