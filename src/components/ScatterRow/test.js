import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import ScatterRow from '../ScatterRow'

const state = {
  domain: {
    x: [1800, 2020]
  },
  data: [{ Born: 1850 }, { Born: 2017 }, { Born: 2000 }],
  test: true
}

describe('ScatterRow', () => {
  let scatterRow

  beforeEach(() => {
    scatterRow = shallow(
      <ScatterRow title="potatoes"
        data={ state.data }
        domain={ state.domain }
        id="obert"
      />
    )
  })

  it('renders correctly', () => {
    expect(toJSON(scatterRow)).toMatchSnapshot()
  })

  it('updates nicely', () => {
    scatterRow.setProps({ title: "baked", ...state })
    expect(toJSON(scatterRow)).toMatchSnapshot()
  })
})
