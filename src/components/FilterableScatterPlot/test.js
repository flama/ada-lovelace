import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

import { fakeDocumentGetters } from '../testHelpers'
import FilterableScatterPlot from '../FilterableScatterPlot'

describe("FilterableScatterPlot", () => {
  fakeDocumentGetters(() => {
    let filterable

    let createElementArray = size => {
      const continents = ["potato", "size", "salad"]
      // create an array of `size` length
      return Array.apply(null, Array(size)).map((_, i) => {
        return {
          Continent: continents[i % 3],
          Informations: "x".repeat(size*i)
        }
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
      filterable.find('select').simulate('change')
      filterable.setState({ activeContinent: "salad", ...filterable.state })
      expect(document.getElementById.mock.calls).toEqual([['details-bubble']])
      expect(toJSON(filterable)).toMatchSnapshot()
    })

    it("properly refreshes on change of category", () => {
      filterable.find('button#category1').simulate('click')
      expect(filterable.state("activeRow")).toEqual("category1")
      expect(toJSON(filterable)).toMatchSnapshot()
    })
  })
})
