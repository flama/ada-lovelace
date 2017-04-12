import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Categories from '../Categories'

describe('Categories', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Categories />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
