import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSliders from './UdaciSliders';
import UdaciSteppers from './UdaciSteppers';

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swin: 0,
    sleep: 0,
    food: 0
  };

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState(state => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({ [metric]: value }));
  };

  submit = params => {
    const key = timeToString();
    const entry = this.state;
  };

  render() {
    const metaInfo = getMetricMetaInfo();
    return (
      <View>
        {Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];
          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSliders value={value} onChange={value => this.slide(key, value)} {...rest} />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
}

export default AddEntry;
