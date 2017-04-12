import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import DetailsBubble from '../DetailsBubble'

// TODO: test `close` functionality
describe('DetailsBubble', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DetailsBubble />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
