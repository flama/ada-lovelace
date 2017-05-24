import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import AboutPage from '../AboutPage'

describe("the about page", () => {
  fit("should render correctly", () => {
    const tree = shallow(<AboutPage />)
    expect(toJSON(tree)).toMatchSnapshot()
  })
})
