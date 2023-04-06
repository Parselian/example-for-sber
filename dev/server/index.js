const express = require('express'),
  db = require('./db'),
  fs = require('fs'),
  cors = require('cors')


const app = express(),
  PORT = 3306

app.use(cors())
app.use(express.json())

app.get("/api/get/liquid-swap-pools", (req, res) => {
  fs.readFile('../client/assets/data/liquid-swap.json', 'utf-8', (err, body) => {
    if (err) return console.error('Error callback: ', err)
    try {
      res.send(JSON.parse(body))
    } catch (err) {
      console.error('Error while parsing JSON string data: ', err)
    }
  })
})

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM transactions", (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})


app.post('/api/create', (req, res) => {
  const platform = req.body.platform,
    date = req.body.order_date,
    transaction_type = req.body.transaction_type,
    sell_coin = req.body.sell_coin,
    buy_coin = req.body.buy_coin,
    price = req.body.order_price,
    amount = req.body.amount,
    comment = req.body.comment

  db.query("INSERT INTO transactions (platform, date, transaction_type, coin_1, coin_2, price, amount, comment) VALUES (?,?,?,?,?,?,?,?)",
    [platform, date, transaction_type, sell_coin, buy_coin, price, amount, comment], (err, result) => {
      if (err) res.send(err)
      else res.send(result)
    });
})

app.delete('/api/delete:id', (req, res) => {
  const id = req.params.id

  db.query("DELETE FROM transactions WHERE id = ?", id, (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})