import React from 'react'
import ReactDOM from 'react-dom'
import Shallow from 'react-test-renderer/shallow'
const renderer = new Shallow()

import FilterableScatterPlot from '../FilterableScatterPlot'

describe("FilterableScatterPlot", () => {
  it("should render correctly", () => {
    const tree = renderer.render(
      <FilterableScatterPlot
        options={{ categories: [] }}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})
