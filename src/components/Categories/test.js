import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import Categories from '../Categories'

describe('Categories', () => {
  let categories

  beforeEach(() => {
    categories = shallow(
      <Categories
        options={ [ 'option1', 'option2', 'testoption' ] }
      />
    )
  })

  it('renders correctly', () => {
    expect(toJSON(categories)).toMatchSnapshot()
  })

  it('changes category when we click on it', () => {
    expect(categories.find('button#option2')).toHaveLength(1)
    categories.find('button#option2').simulate('click')
    expect(categories.find('button#option2').hasClass('selected')).toBeTruthy()
  })

  it('changes back to All when we click on it', () => {
    categories.find('button#option2').simulate('click')
    categories.find('button#-1').simulate('click')
    expect(categories.find('button#-1').hasClass('selected')).toBeTruthy()
  })
})
