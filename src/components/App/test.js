import React from 'react';
import ReactDOM from 'react-dom';
import Shallow from 'react-test-renderer/shallow'
const renderer = new Shallow()

import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer.render(<App />)
    expect(tree).toMatchSnapshot()
  })
})
