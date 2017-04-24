export function fakeElement() {
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
    style: {},
    id: 'potato-teste/teste'
  }
  return ret
}

export function fakeDocumentGetters(cb) {
  let findByClassName, findById
  let fakeClassNameObject, fakeIdObject, fakeElementsList

  fakeClassNameObject = fakeElement()
  fakeIdObject = fakeElement()

  findByClassName = document.getElementsByClassName
  findById = document.getElementById

  fakeElementsList = [fakeClassNameObject]
  fakeElementsList.item = i => fakeElementsList[i]

  document.getElementsByClassName = jest.fn()
    .mockReturnValue(fakeElementsList)
  document.getElementById = jest.fn()
    .mockReturnValue(fakeIdObject)

  cb({ fakeClassNameObject, fakeIdObject, fakeElementsList })

  afterAll(() => {
    document.getElementsByClassName = findByClassName
    document.getElementById = findById
  })
}
