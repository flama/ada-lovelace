import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import ExpansibleScatterRow from '../ExpansibleScatterRow'

describe("ExpansibleScatterRow", () => {
  let expansible

  beforeEach(() => {
    expansible = shallow(
      <ExpansibleScatterRow
        data={{
          active: false,
          division: {},
          array: []
        }}
        domain={{ x: [1800, 2020] }}
      />
    )
  })

  it("should render categories corretly", () => {
    expect(expansible).toMatchSnapshot()
  })

  it("should render subcategories correctly", () => {
    expansible.setProps({
      data: {
        active: true,
        division: {
          subdiv1: [1, 2, 3],
          subdiv2: [4, 5, 6],
          subdivtest: [7, 8, 9]
        },
        array: []
      }, domain: { x: [1800, 2020] }
    })
    expect(expansible).toMatchSnapshot()
  })
})
