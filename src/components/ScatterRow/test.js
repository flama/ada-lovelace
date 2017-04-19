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
      expect(Ball.shrink).toHaveBeenCalled()
    })
  })

  let getBalls = () => d3.selectAll('circle')

  function fireEvent(el, etype) {
    if(Event) {
      let ev = new Event(etype)
      el.dispatchEvent(ev)
    }
    else {
      let ev = document.createEvent('Events')
      ev.initEvent(etype, true, false)
      el.dispatchEvent(ev)
    }
  }
})

describe('ballManipulator', () => {
  jest.useFakeTimers()

  let findByClassName, findById
  let fakeClassNameObject, fakeIdObject
  let target

  beforeEach(() => {
    target = fakeElement()
    fakeClassNameObject = fakeElement()
    fakeIdObject = fakeElement()

    findByClassName = document.getElementsByClassName
    findById = document.getElementById

    let fakeElementsList = [fakeClassNameObject]
    fakeElementsList.item = i => fakeElementsList[i]

    document.getElementsByClassName = jest.fn()
      .mockReturnValue(fakeElementsList)
    document.getElementById = jest.fn()
      .mockReturnValue(fakeIdObject)
  })

  it('grows', () => {
    ballManipulator.grow(target)

    expect(target.setAttribute).toHaveBeenCalledWith('r', 5*2.26)
    expect(target.classList.add).toHaveBeenCalledWith('growing')
    expect(fakeClassNameObject.classList.add).toHaveBeenCalledWith('shrinking')
    expect(fakeClassNameObject.setAttribute).toHaveBeenCalledWith('r', 10/3)
    jest.runAllTimers()
    expect(target.classList.remove).toHaveBeenCalledWith('growing')
    expect(target.setAttribute).toHaveBeenCalledWith('r', 10)
  })

  it('shrinks', () => {
    ballManipulator.shrink()

    expect(fakeClassNameObject.classList.remove).toHaveBeenCalledWith('growing')
    expect(fakeClassNameObject.classList.remove).toHaveBeenCalledWith('shrinking')
    expect(fakeClassNameObject.setAttribute).toHaveBeenCalledWith('r', 5)
  })

  it('opens', () => {
    ballManipulator.open(target, {
      Name: 'Avocado',
      Occupation: 'potato-salad maker',
      Country: 'Braziland',
      Informations: 'Such a good person'
    })

    expect(fakeClassNameObject.setAttribute).toHaveBeenCalledWith('r', 10/3)
    expect(fakeClassNameObject.classList.add).toHaveBeenCalledWith('shrinking')
    expect(fakeClassNameObject.classList.add).toHaveBeenCalledWith('faded')
    expect(fakeIdObject.classList.remove).toHaveBeenCalledWith('show')
    jest.runAllTimers()
    expect(fakeIdObject.appendChild).toHaveBeenCalledWith(document.createTextNode('Avocado'))
    expect(fakeIdObject.appendChild)
      .toHaveBeenCalledWith(document.createTextNode('Potato-salad maker from Braziland'))
    expect(fakeIdObject.setAttribute).toHaveBeenCalledWith('href', 'Such a good person')
    expect(fakeIdObject.style.top).toBe('5.5px')
    expect(fakeIdObject.style.left).toBe('5.5px')
    expect(fakeIdObject.classList.add).toHaveBeenCalledWith('show')
  })

  afterEach(() => {
    document.getElementsByClassName = findByClassName
    document.getElementById = findById
  })

  function fakeElement() {
    let ret = {
      classList: {
        contains: jest.fn(),
        add: jest.fn(),
        remove: jest.fn()
      },
      setAttribute: jest.fn(),
      appendChild: jest.fn(),
      lastChild: true,
      childNodes: [1,2,3],
      removeChild: function() {
        this.lastChild = false
      },
      getBoundingClientRect: () => ({
        top: 500,
        left: 100
      }),
      getElementsByClassName: jest.fn()
        .mockReturnValue({
          item: () => ret
        }),
      style: {}
    }
    return ret
  }
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
