import axios from 'axios'

const Api = axios.create({ baseURL: 'http://localhost:8000' })

export default {
  createLibrary (libraryData) {
    console.log(libraryData)
    return Api.post('/library/create', libraryData)
  },
  getLibraryList (listRange) {
    console.log(listRange)
    return Api.post('/library/list', listRange)
  },
  getLibraryItems (libraryData) {
    return Api.post('/library/items', libraryData)
  },
  getItemInfo (itemData) {
    return Api.post('/item/info', itemData)
  }
}
