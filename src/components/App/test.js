import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import App from '../App'

describe('App', () => {
  let app

  beforeEach(() => {
    app = shallow(<App />)
  })

  it('renders correctly', () => {
    expect(toJSON(app)).toMatchSnapshot()
  })

  it('correctly toggles state when requested', () => {
    expect(app.state("open")).toBeFalsy()
    app.instance().toggleMenu()
    expect(app.state("open")).toBeTruthy()
    app.instance().toggleMenu()
    expect(app.state("open")).toBeFalsy()
  })

  it('adds .-open to #app when toggled', () => {
    app.instance().toggleMenu()
    expect(app.find('#app').hasClass('-open')).toBeTruthy()
  })
})
