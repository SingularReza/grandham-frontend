import axios from 'axios'

const FileDownload = require('js-file-download')
const Api = axios.create({ baseURL: 'https://www.googleapis.com/drive/v3/files/' })

export default {
  downloadFile (fileID, fileName, token) {
    Api.get(`${fileID}`, {
      params: {
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        alt: 'media'
      },
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      FileDownload(res.data, fileName)
    })
  },
  streamFile (token, fileID) {
    return Api.get(`${fileID}`, {
      params: {
        includeItemsFromAllDrives: true,
        supportsAllDrives: true,
        fields: 'webViewLink'
      },
      headers: {
        Authorization: `Bearer ${token}`
        // Range: `bytes=${range[0]}-${range[1]}`
      }
    })
  }
}
