import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Home from '../Home'

describe('Home', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
