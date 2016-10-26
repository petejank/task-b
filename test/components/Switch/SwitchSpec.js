'use strict';

import {shallow} from 'enzyme';
import React from 'react';
import SwitchInject from 'inject!components/Switch/Switch';
import getStorage from '../../getStorage';

import R from 'ramda';

describe('Switch', () => {
  let wrapper, Switch, toggleRoomSwitchStub, thenStub;

  beforeEach(() => {
    Switch = SwitchInject({
      'other/dataApi': {
        toggleRoomSwitch: toggleRoomSwitchStub = sinon.stub().returns(
          {
            then: thenStub = sinon.stub()
          }
        )
      }
    }).default;

    const switchData = R.merge(getStorage().data.rooms[0].controls[0], {roomId: 0});
    wrapper = shallow(<Switch {...switchData}/>);
  });

  it('on {componentWillMount} set active state based on props and render it', () => {
    expect(wrapper.state()).to.be.deep.equal({active: true});
    expect(wrapper.find('.control-row__status').text()).to.be.equal('Open');
    expect(wrapper.find('Switch').props()).to.contain({
      onChange: wrapper.instance().onChange,
      checked: true
    });
  });

  it('on {onChange} on Switch toggle switch state', () => {
    wrapper.find('Switch').simulate('change');
    expect(toggleRoomSwitchStub).to.be.calledOnce;
    expect(toggleRoomSwitchStub).to.be.calledWith(0, 0);
    expect(thenStub).to.be.calledOnce;

    thenStub.args[0][0](false);
    expect(wrapper.state()).to.be.deep.equal({active: false});
    // Force re-render
    wrapper.setState(wrapper.state());
    expect(wrapper.find('.control-row__status').text()).to.be.equal('Closed');
  });
});
