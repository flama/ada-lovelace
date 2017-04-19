import ballManipulator from './ball-manipulator'

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
