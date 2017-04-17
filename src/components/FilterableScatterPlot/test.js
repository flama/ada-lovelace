import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import FilterableScatterPlot from '../FilterableScatterPlot'

describe("FilterableScatterPlot", () => {
  it("should render correctly", () => {
    const tree = shallow(<FilterableScatterPlot />)
    expect(toJSON(tree)).toMatchSnapshot()
  })
})
