'use strict';

import './assets/room.scss';

import React, {PropTypes} from 'react';

import controls from './controls';

export default React.createClass({
  propTypes: {
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    controls: PropTypes.array.isRequired
  },
  render() {
    return (
      <section className="room">
        <h2 className="room__name">{this.props.name}</h2>
        {
          this.props.controls.map((control, index) => {
            const Component = controls[control.type];
            return <Component key={index} {...control} roomId={this.props._id}/>;
          })
        }
      </section>
    );
  }
});
