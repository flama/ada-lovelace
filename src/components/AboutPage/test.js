import React from 'react'
import ReactDOM from 'react-dom'
import Shallow from 'react-test-renderer/shallow'
const renderer = new Shallow()

import AboutPage from '../AboutPage'

describe("the about page", () => {
  it("should render correctly", () => {
    const tree = renderer.render(<AboutPage />)
    expect(tree).toMatchSnapshot()
  })
})
