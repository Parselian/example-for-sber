'use-strict'

const https = require('https')

const fetchList = (requestBody, requestOptions = null) => {
  let output = ''

  return new Promise((resolve, reject) => {
    const request = https.request(requestBody, (res) => {
      res.on('data', d => {
        output += d
      })
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error("Api call failed with response code " + res.statusCode);
          request.end()
        }

        resolve(output)
        request.end()
      })
    })

    if (requestOptions !== null) request.write(JSON.stringify(requestOptions))

    request.on('error', error => {
      reject(error)
      request.end()
    })
  })
}

module.exports = fetchList