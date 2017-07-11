import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import DetailsBubble from '../DetailsBubble'

describe('DetailsBubble', () => {
  let detailsBubble
  let close

  beforeEach(() => {
    close = jest.fn()
    detailsBubble = shallow(<DetailsBubble close={ () => close() }/>)
  })

  it('renders correctly', () => {
    expect(toJSON(detailsBubble)).toMatchSnapshot()
  })

  it('closes when we ask it to', () => {
    detailsBubble.find('a.close').simulate('click')
    expect(close).toHaveBeenCalled()
  })
})
