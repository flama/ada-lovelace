import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import ExpansibleScatterRow from '../ExpansibleScatterRow'

const domain = { x: [1800, 2020] }

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
        domain={ domain }
        title="obert"
      />
    )
  })

  it("should render categories corretly", () => {
    expect(toJSON(expansible)).toMatchSnapshot()
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
      }, domain
    })
    expect(toJSON(expansible)).toMatchSnapshot()
  })

  it("shouldn't render more than 20 items in the same 11 year period", () => {
    let datum = { Born: 1990 }
    expansible.setProps({
      data: {
        active: false,
        division: {
          subdiv: [datum, datum, datum, datum, datum, datum, datum,
          datum, datum, datum, datum, datum, datum, datum,
          datum, datum, datum, datum, datum, datum, datum,
          datum, datum, datum, datum, datum, datum, datum]
        },
        array: [datum, datum, datum, datum, datum, datum, datum,
          datum, datum, datum, datum, datum, datum, datum,
          datum, datum, datum, datum, datum, datum, datum,
          datum, datum, datum, datum, datum, datum, datum]
      }, domain
    })
    expect(toJSON(expansible)).toMatchSnapshot()
  })
})
