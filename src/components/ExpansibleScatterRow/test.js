import React from 'react'
import ReactDOM from 'react-dom'
import Shallow from 'react-test-renderer/shallow'
const renderer = new Shallow()

import ExpansibleScatterRow from '../ExpansibleScatterRow'

// TODO: test functionality 

describe("ExpansibleScatterRow", () => {
  it("should render categories corretly", () => {
    let tree = renderer.render(
      <ExpansibleScatterRow
        data={{
          active: false,
          division: {},
          array: []
        }}
        domain={{ x: [1800, 2020] }}
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it("should render subcategories correctly", () => {
    let tree = renderer.render(
      <ExpansibleScatterRow
        data={{
          active: true ,
          division: {},
          array: []
        }}
        domain={{ x: [1800, 2020] }}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})
