import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

import FilterableScatterPlot from '../FilterableScatterPlot'

function mockDocument(callback) {
  const trueId = document.getElementById
  const trueClass = document.getElementsByClassName

  document.getElementById = jest.fn()
    .mockReturnValueOnce({
      classList: { remove: _=>_ }
    })
  document.getElementsByClassName = jest.fn()
    .mockReturnValueOnce([
      { classList: { remove: _=>_ }, setAttribute: _=>_ },
      { classList: { remove: _=>_ }, setAttribute: _=>_ }
    ])

  callback()

  document.getElementById = trueId
  document.getElementsByClassName = trueClass
}

describe("FilterableScatterPlot", () => {
  let filterable

  let createElementArray = size => {
    const continents = ["potato", "size", "salad"]
    // create an array of `size` length
    return Array.apply(null, Array(size)).map((_, i) => {
      return { Continent: continents[i % 3] }
    })
  }

  beforeEach(() => {
    filterable = mount(
      <FilterableScatterPlot
        dataList={{
          category1: {
            active: false,
            array: createElementArray(5),
            division: {
              subdiv1: createElementArray(3),
              subdiv2: createElementArray(2)
            }
          }
        }}
        options={{
          categories: ["category1"]
        }}
      />
    )
  })

  it("should render correctly", () => {
    expect(toJSON(filterable)).toMatchSnapshot()
  })

  it("properly refreshes on change of continent", () => {
    mockDocument(() => {
      filterable.find('select').simulate('change')
      filterable.setState({ activeContinent: "salad", ...filterable.state })
      expect(document.getElementById.mock.calls).toEqual([['details-bubble']])
      expect(toJSON(filterable)).toMatchSnapshot()
    })
  })

  it("properly refreshes on change of category", () => {
    mockDocument(() => {
      filterable.find('button#category1').simulate('click')
      expect(filterable.state("activeRow")).toEqual("category1")
      expect(toJSON(filterable)).toMatchSnapshot()
    })
  })
})
