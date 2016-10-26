'use strict';

import {shallow} from 'enzyme';
import React from 'react';
import TemperatureInject from 'inject!components/Temperature/Temperature';
import getStorage from '../../getStorage';

import R from 'ramda';

describe('Temperature', () => {
  let wrapper, Temperature, setRoomTemperatureStub, progressStub;

  beforeEach(() => {
    Temperature = TemperatureInject({
      'other/dataApi': {
        setRoomTemperature: setRoomTemperatureStub = sinon.stub().returns({
          progress: progressStub = sinon.stub()
        })
      }
    }).default;

    const tempData = R.merge(getStorage().data.rooms[0].controls[2], {roomId: 0});
    wrapper = shallow(<Temperature {...tempData}/>);
  });

  it('on {componentWillMount} set state based on props and render it', () => {
    const state = getStateParams();
    expect(wrapper.state()).to.be.deep.equal(state);

    const sliders = wrapper.find('Slider');
    expect(sliders.length).to.be.equal(2);
    expect(sliders.at(0).props()).to.contain(R.merge(getSliderProps(state), {
      disabled: true,
      value: state.current
    }));
    expect(sliders.at(0).props().marks).to.be.deep.equal(state.sliderMarks);

    expect(sliders.at(1).props()).to.contain(R.merge(getSliderProps(state), {
      defaultValue: state.current,
      onAfterChange: wrapper.instance().onAfterChange
    }));
    expect(sliders.at(1).props().marks).to.be.deep.equal(state.sliderMarks);
  });

  it('on {onChange} on active Slie adjusts temperature value', () => {
    const newTemperature = 10;
    wrapper.find('Slider').at(1).simulate('afterChange', newTemperature);
    expect(setRoomTemperatureStub).to.be.calledOnce;
    expect(setRoomTemperatureStub).to.be.calledWith(0, 2, newTemperature);
    expect(progressStub).to.be.calledOnce;

    progressStub.args[0][0](newTemperature);
    expect(wrapper.state().current).to.be.equal(newTemperature);
  });

  function getSliderProps(state) {
    return {
      min: state.min,
      max: state.max,
      className: 'temperature__slider'
    };
  }

  function getStateParams() {
    return {
      desiredCurrent: 22,
      current: 22,
      max: 25,
      min: 15,
      sliderMarks: {
        15: {
          style: {color: '#FFF', fontSize: '12px'},
          label: '15°C'
        },
        25: {
          style: {color: '#FFF', fontSize: '12px'},
          label:'25°C'
        }
      }
    };
  }
});
