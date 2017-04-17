import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const tree = shallow(<App />)
    expect(toJSON(tree)).toMatchSnapshot()
  })
})
