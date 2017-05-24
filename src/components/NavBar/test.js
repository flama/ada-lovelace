import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import NavBar from '../NavBar'

describe('the NavBar', () => {
  let navbar

  beforeEach(() => {
    navbar = shallow(<NavBar />)
  })

  it('renders correctly', () => {
    expect(toJSON(navbar)).toMatchSnapshot()
  })

  it('adds .-open to .nav-burger when open', () => {
    navbar.setProps({ open: true })
    expect(navbar.find('.nav-burger').hasClass('-open')).toBeTruthy()
  })
})
