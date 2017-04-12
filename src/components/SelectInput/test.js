import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import SelectInput from '../SelectInput'

describe('SelectInput', () => {
  const tree = renderer.create(SelectInput).toJSON()
  expect(tree).toMatchSnapshot()
})
