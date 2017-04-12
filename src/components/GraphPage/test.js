import React from 'react'
import ReactDOM from 'react-dom'
import Shallow from 'react-test-renderer/shallow'
const renderer = new Shallow()

import GraphPage from '../GraphPage'

jest.mock('../DataLoader', _ => {
  return props => {
    console.log(props)
    // props.fetchData()
    return <div />
  }
})

describe("the graph page", () => {
  it("should render correctly", () => {
    const tree = renderer.render(<GraphPage />)
    expect(tree).toMatchSnapshot()
  })
})
