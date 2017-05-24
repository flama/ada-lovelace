import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import NavBar from '../NavBar'

describe('the NavBar', () => {
  it('renders correctly', () => {
    const navbar = renderer.create(<NavBar />).toJSON()
    expect(navbar).toMatchSnapshot()
  })
})
