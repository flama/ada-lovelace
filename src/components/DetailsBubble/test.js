import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import DetailsBubble from '../DetailsBubble'

// TODO: test `close` functionality
describe('DetailsBubble', () => {
  it('renders correctly', () => {
    const tree = shallow(<DetailsBubble />)
    expect(toJSON(tree)).toMatchSnapshot()
  })

  it('closes when we ask it to', () => {
    let close = jest.fn()
    let detailsBubble = shallow(<DetailsBubble close={ () => close() } />)
    detailsBubble.find('a.close').simulate('click')
    expect(close).toHaveBeenCalled()
  })
})
