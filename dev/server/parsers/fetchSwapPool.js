'use-strict'

const parser = require('./core'),
  fs = require('fs')

/*--- If you have some problems with Binance API, don`t forget about the BinanceAPI DOCUMENTATION :)) ---*/

function fetchSwapPool() {
  const data = []
  let pageIndex = 1

  const _payload = {
      "isMatchAsset": false,
      "isStackedOnly": false,
      "searchType": "", //Also could be STABLE (See stable pool section)
      "asset": "", // It needs to search certain couple (f.e.: ETH/BETH)
      "pageIndex": pageIndex,
      "pageSize": 100,
      "orderby": ""
    },
    _requestBodyTemplate = {
      hostname: "www.binance.com",
      port: 443,
      method: "GET",
      path: `/bapi/earn/v3/friendly/swap-api/pool/pairList?isMatchAsset=false&isStackedOnly=false&searchType=UNSTABLE&asset=&pageIndex=${pageIndex}&pageSize=100&orderby=`,
      headers: {
        'Content-Type': 'application/json'
      }
    }

  function filterData(arr) {
    return arr.map(obj => (
      {
        'poolName': obj['poolName'],
        'volume': obj['volume'],
        'liquidity': obj['poolValuation'],
        'APR': obj['apy'],
        'investAmount': 100
      }
    ))
  }

  const interval = setInterval(() => {
    if (pageIndex === 3) clearInterval(interval)

    _payload.pageIndex = pageIndex
    _requestBodyTemplate.path = `/bapi/earn/v3/friendly/swap-api/pool/pairList?isMatchAsset=false&isStackedOnly=false&searchType=UNSTABLE&asset=&pageIndex=${pageIndex}&pageSize=100&orderby=`

    parser(_requestBodyTemplate, _payload)
      .then(response => {
        data.push(...filterData(JSON.parse(response).data))

        if (pageIndex === 3) {
          fs.writeFile("../../client/assets/data/liquid-swap.json", JSON.stringify(data), err => {
            if (err) throw new Error(err)
            else console.log('Yo bro, we got your data!')
          })
        }
      })
    pageIndex++;
  }, 3000)
}

fetchSwapPool()