import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

import SelectInput from '../SelectInput'

describe('SelectInput', () => {
  let selectInput
  let onChange
  let closeBubble

  beforeEach(() => {
    onChange = jest.fn()
    closeBubble = jest.fn()
    selectInput = mount(<SelectInput />)
  })

  it('renders correctly', () => {
    expect(toJSON(selectInput)).toMatchSnapshot()
  })

  it('calls callbacks when option changes', () => {
    selectInput.find('select').simulate('change')

    selectInput.setProps({
      onChange,
      closeBubble,
      options: [1, 2, 3]
    })

    expect(toJSON(selectInput)).toMatchSnapshot()

    selectInput.find('select').simulate('change')

    expect(onChange).toHaveBeenCalled()
    expect(closeBubble).toHaveBeenCalled()
  })
})
