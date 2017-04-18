import React from 'react'
import ReactDOM from 'react-dom'
import { mount, shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import * as d3 from 'd3'

import d3chartHelper from './d3chart-helper'
import ballManipulator from './ball-manipulator'
import ScatterRow from '../ScatterRow'

const state = {
  domain: {
    x: [1800, 2020]
  },
  data: [{ Born: 1850 }, { Born: 2017 }, { Born: 2000 }],
  test: true
}

describe('d3chartHelper', () => {
  let chart
  let Ball = {}
  const body = document.getElementsByTagName('body')[0]

  beforeEach(() => {
    Ball = { grow: jest.fn(), open: jest.fn(), shrink: jest.fn() }

    chart = new d3chartHelper(body, {
      width: "300",
      height: "300"
    }, state, Ball)
  })

  afterEach(() => {
    chart.destroy()
    d3.selectAll('svg').remove()
  })

  describe('the svg', () => {
    it('should be created', () => {
      expect(d3.select('svg')).not.toBeNull()
    })

    it('has the correct props', () => {
      expect(d3.select('svg').attr('height')).toEqual("300")
      expect(d3.select('svg').attr('width')).toEqual("300")
    })
  })

  describe('ball creation', () => {
    it('should render the correct number of balls', () => {
      expect(getBalls().size()).toBe(3)
    })

    it('makes all the balls grow', () => {
      expect(parseInt(getBalls().attr('r'))).toBe(0)
      d3.timerFlush()
      expect(parseInt(getBalls().attr('r'))).toBe(5)
    })
  })

  describe('updates', () => {
    it('properly adapts internal state to given data', () => {
      chart.update(body, { domain: state.domain, data: [
        { Born: 1910 }, { Born: 2019 }
      ]})
      d3.timerFlush()
      expect(getBalls().size()).toBe(2)
    })

    it('opens bubble when ball is clicked', () => {
      fireEvent(document.getElementsByTagName('circle')[0], 'click')
      expect(Ball.open).toHaveBeenCalled()
    })

    it('grows and shrinks balls when needed', () => {
      let ball = document.getElementsByTagName('circle')[0]

      fireEvent(ball, 'mouseenter')
      expect(Ball.grow).toHaveBeenCalledWith(ball)
      fireEvent(ball, 'mouseleave')
      expect(Ball.shrink).toHaveBeenCalledWith(ball)
    })
  })

  let getBalls = () => d3.selectAll('circle')

  function fireEvent(el, etype) {
    if(el.fireEvent) el.fireEvent(`on${etype}`)
    else {
      let ev = document.createEvent('Events')
      ev.initEvent(etype, true, false)
      el.dispatchEvent(ev)
    }
  }
})

describe('ballManipulator', () => {
  jest.useFakeTimers()

  // TODO: write tests over ballManipulator
})

describe('ScatterRow', () => {
  let scatterRow

  beforeEach(() => {
    scatterRow = shallow(
      <ScatterRow title="potatoes"
        data={ state.data }
        domain={ state.domain }
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
