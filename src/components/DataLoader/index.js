import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { apiKey } from '../../alicia-keys'

const regions = ['Africa', 'Latin America', 'North America', 'Asia', 'Europe', 'Oceania'].sort()

class DataLoader extends Component {

  render() {
    return <div />
  }

  componentDidMount() {
    this.request()
      .then(data => this.props.fetchData(data))
      .catch(error => console.error(error))
  }

  request = () => {
    return Promise.all([
      fetch(this.createUrl())
        .then(response => response.json())
        .then(data => data.valueRanges)
        .then(ranges => ranges.map(range => range.values))
        .then(data => data.map(datum => datum.map(atom => atom.map(subatom => subatom.trim()))))
        .then(this.segregateColsFromSheets)
        .then(this.addContinentToWomen)
        .then(this.joinSheets)
        .then(this.removeEmptyWomen)
        .then(this.sheetToObject)
        .then(this.convertFiltersToTags)
        .then(this.removeWomenThatAreNotBorn)
        .then(this.transformBCToNegative)
        .then(this.removeWomenThatAreNotBorn)
        .then(this.organizeByTag)
        .catch(error => console.error(error)),
      fetch(this.createUrl({ categories: true }))
        .then(response => response.json())
        .then(data => data.valueRanges)
        .then(ranges => ranges.map(range => range.values))
        .then(data => data[0])
        .then(data => data.map(datum => datum.map(atom => atom.trim())))
        .catch(error => console.error(error))
    ])
    .then(([ data, categories ]) => {
      let organized = {}
      categories.forEach(category => {
        let categoryName = category[0]
        let subcategories = category.slice(1)

        organized[categoryName] = {}

        subcategories.forEach(subcategory => {
          organized[categoryName][subcategory] = Array.from(data[subcategory] || [])
        })
      })

      return { dataList: organized, options: {
        categories: categories.map(x => x[0]),
        continents: regions
      }}
    })
    .then(this.addStatusToCategories(true))
    .then(this.categoriesToArrays)
  }

  segregateColsFromSheets = tables => {
    let cols = tables[0][0]
    let sheets = tables.map(table => table.slice(1))

    return { cols, sheets }
  }

  addContinentToWomen = ({cols, sheets}) => {
    cols.unshift("Continent")
    sheets = sheets.map((sheet, regionIndex) => {
      return sheet.map(woman => [regions[regionIndex]].concat(woman))
    })
    return { cols, sheets }
  }

  joinSheets = ({cols, sheets}) => {
    return { cols, women: sheets.reduce((acc, value) => acc.concat(value)) }
  }

  removeEmptyWomen = ({cols, women}) => {
    return { cols, women: women.filter(woman => woman[0] !== "") }
  }

  sheetToObject = ({ cols, women }) => {
    return women.map(woman => {
      let newWoman = {}
      cols.forEach((column, index) => newWoman[column] = woman[index])
      return newWoman
    })
  }

  convertFiltersToTags = women => {
    return women.map(woman => {
      let tags = []
      let tagNames = ['1','2','3','4','5']

      tagNames.forEach(filter => {
        if(woman[`Filtro ${filter}`])
          tags.push(woman[`Filtro ${filter}`])
      })

      woman.tags = tags
      return woman
    })
  }

  transformBCToNegative = women => women.map(woman => {
    let [year, bc] = woman.Born.split(" ")
    year = parseInt(year, 10)

    if(typeof bc !== "undefined") year = -year

    woman.Born = year
    return woman
  })

  removeWomenThatAreNotBorn = women => women.filter(woman => woman.Born)

  organizeByTag = women => women.reduce((acc, woman) => {
    woman.tags.forEach(tag => {
      acc[tag] = (acc[tag] || new Set()).add(woman)
    })
    return acc
  }, {})

  addStatusToCategories = status => {
    return ({ dataList, options }) => {
      Object.keys(dataList).forEach(categoryName => {
        dataList[categoryName] = {
          division: dataList[categoryName],
          active: false
        }
      })

      return { dataList, options }
    }
  }

  categoriesToArrays = ({ dataList, options }) => {
    Object.keys(dataList).forEach(categoryName => {
      let subcategories = dataList[categoryName].division

      dataList[categoryName].array = Array.from(Object.keys(subcategories)
        .reduce((acc, subcatName) => new Set([...acc, ...subcategories[subcatName]]), new Set()))
    })

    return ({ dataList, options })
  }

  createUrl = options => {
    const spreadsheetId = '18VumVINXYypPAPA5aqLhw-BoFHqb5CGCrDI3JeBIs6I'
    const baseAPI = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`
    const categoriesIndex = 'Subcategories'

    let values = regions.reduce((acc, value) => acc += `ranges=${value}&`, "")

    if(options && options.categories)
      return `${baseAPI}/values:batchGet?ranges=${categoriesIndex}&key=${apiKey}`
    else
      return `${baseAPI}/values:batchGet?${values}key=${apiKey}`
  }
}

DataLoader.propTypes = {
  fetchData: PropTypes.func
}

export default DataLoader
