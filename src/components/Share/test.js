import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import Share from '../Share'

describe("the share section", () => {
  let share

  beforeEach(() => {
    share = shallow(<Share />)
  })

  it("renders correctly", () => {
    expect(toJSON(share)).toMatchSnapshot()
  })
})
