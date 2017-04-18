import React from 'react'
import ReactDOM from 'react-dom'
import DataLoader from '../DataLoader'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

let Amanda = {
  Name: 'Amanda', Born: -1988, Continent: 'Africa',
  'Filtro 1': 'soda', 'Filtro 2': 'acid',
  'Filtro 3': 'tomato', 'Filtro 4': 'orange', 'Filtro 5': 'clothes',
  tags: ['soda', 'acid', 'tomato', 'orange', 'clothes']
}

let Natalia = {
  Name: 'Natália', Born: 1999, Continent: 'North America',
  'Filtro 1': 'danish', 'Filtro 2': 'water', 'Filtro 3': 'brizz',
  'Filtro 4': 'potato', 'Filtro 5': 'milk',
  tags: ['danish', 'water', 'brizz', 'potato', 'milk']
}

const fakedata = [
  ['Name', 'Born', 'Continent',
    'Filtro 1', 'Filtro 2', 'Filtro 3', 'Filtro 4', 'Filtro 5'],
  ['Amanda', '1988 BC', 'Africa',
    'soda', 'acid', 'tomato', 'orange', 'clothes'],
  ['Natália', '1999', 'North America',
    'danish', 'water', 'brizz', 'potato', 'milk']
]

const fakecategories = [
  ['fruits', 'pineapples', 'orange', 'tomato'],
  ['liquids', 'milk', 'water', 'soda', 'acid'],
  ['chocolate', 'belgian', 'swiss', 'danish'],
  ['objects', 'freezer', 'glasses', 'clothes'],
  ['concepts', 'potatos', 'avocados', 'brizz']
]

const formattedArrays = {
  fruits: [Amanda], liquids: [Natalia, Amanda],
  chocolate: [Natalia], objects: [Amanda], concepts: [Natalia]
}

const formattedCategories = {
  fruits: {
    pineapples: [],
    orange: [Amanda],
    tomato: [Amanda]
  }, liquids: {
    milk: [Natalia],
    water: [Natalia],
    soda: [Amanda],
    acid: [Amanda]
  }, chocolate: {
    belgian: [],
    swiss: [],
    danish: [Natalia]
  }, objects: {
    freezer: [],
    glasses: [],
    clothes: [Amanda]
  }, concepts: {
    potatos: [],
    avocados: [],
    brizz: [Natalia]
  }
}

fetch = url => new Promise((resolve, reject) => {
  if(url === "breakme!") reject("An error has occurred")
  if(/Subcategories/.test(url)) // if we're requesting categories
  {
    resolve({
      json: () => {
        return {
          valueRanges: [{ values: fakecategories }]
        }
      }
    })
  } else {
    resolve({
      json: () => {
        return {
          valueRanges: [{ values: fakedata }]
        }
      }
    })
  }
})

describe("DataLoader", () => {
  let dataLoader

  beforeEach(() => {
    dataLoader = shallow(<DataLoader fetchData={ _=>_ }/>)
  })

  it("should render correctly", () => {
    expect(toJSON(dataLoader)).toMatchSnapshot()
  })

  it("should return formatted data through callback", () => {
    return dataLoader.instance().request()
      .then(data => {
        expect(Object.keys(data.dataList).length).toEqual(fakecategories.length)

        fakecategories.forEach(category => {
          let categoryData = data.dataList[category[0]]
          expect(categoryData).not.toBeUndefined()

          expect(categoryData.division).toEqual(formattedCategories[category[0]])
          expect(categoryData.array).toEqual(formattedArrays[category[0]])
        })

        return data
      })
  })

  it("transforms BC to negative", () => {
    return dataLoader.instance().request()
      .then(data => expect(data.dataList.liquids.array[1].Born).toEqual(Amanda.Born))
  })

  it("prints error on console", done => {
    const originalConsole = console.error
    console.error = jest.fn()

    dataLoader.instance().createUrl = () => "breakme!"

    dataLoader.shallow()

    dataLoader.instance().request()
    .catch(error => {
      expect(console.error).toHaveBeenCalledTimes(2)
      console.error = originalConsole
      done()
    })
  })
})
