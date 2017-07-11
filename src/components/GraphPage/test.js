import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import GraphPage from '../GraphPage'

describe("the graph page", () => {
  let graphPage

  beforeEach(() => {
    graphPage = shallow(<GraphPage />)
  })

  it("should render correctly", () => {
    expect(toJSON(graphPage)).toMatchSnapshot()
  })

  it("refreshes when inputted data", () => {
    const options = {
      categories: ["4", "5", "6"]
    }

    graphPage.instance().fetchData({
      options,
      dataList: {}
    })
    expect(graphPage.state("options")).toEqual(options)
  })
})
