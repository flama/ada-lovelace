import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import ScatterPlot from '../ScatterPlot'

describe("ScatterPlot", () => {
  let scatterPlot

  let generateCategory = active => {
    return {
      active,
      array: [1, 2, 3, 4, 5, 6],
      division: {
        subcat1: [1, 2, 3],
        subcat2: [4, 5, 6]
      }
    }
  }

  beforeEach(() => {
    scatterPlot = shallow(<ScatterPlot closeBubble={ _=>_ }/>)
  })

  it('renders correctly', () => {
    expect(toJSON(scatterPlot)).toMatchSnapshot()
  })

  it('creates ExpansibleScatterRows as needed', () => {
    scatterPlot.setProps({
      dataList: {
        category1: generateCategory(false),
        category2: generateCategory(false),
        categorytest: generateCategory(true)
      }
    })
  })
})
