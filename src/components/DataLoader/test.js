import React from 'react'
import ReactDOM from 'react-dom'
import DataLoader from '../DataLoader'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

fetch = url => new Promise((resolve, reject) => {
  resolve({
    json: () => {
      return {
        valueRanges: [{ values: [[]] }]
      }
    }
  })
})

describe("DataLoader", () => {
  it("should render correctly", () => {
    let dataLoader = shallow(<DataLoader fetchData={ _=>_ }/>)
    expect(toJSON(dataLoader)).toMatchSnapshot()
  })
})

// TODO: test all the data manipulations
