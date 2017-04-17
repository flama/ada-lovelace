import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import GraphPage from '../GraphPage'

jest.mock('../DataLoader', () => {
  return props => {
    props.fetchData({
      dataList: [],
      options: {
        categories: ["potato"]
      }
    })
    return <div />
  }
})

describe("the graph page", () => {
  it("should render correctly", () => {
    const tree = shallow(<GraphPage />)
    expect(toJSON(tree)).toMatchSnapshot()
  })
})
