import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import ExpansibleScatterRow from '../ExpansibleScatterRow'

// TODO: test functionality

describe("ExpansibleScatterRow", () => {
  it("should render categories corretly", () => {
    let tree = shallow(
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

  // TODO: move shallow to beforeEach, use setProps to change active prop
  it("should render subcategories correctly", () => {
    let tree = shallow(
      <ExpansibleScatterRow
        data={{
          active: true,
          division: {},
          array: []
        }}
        domain={{ x: [1800, 2020] }}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})
