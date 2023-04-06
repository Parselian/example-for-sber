import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import Axios from "axios"
import styles from "./Transactions.module.css"

import LazyInput from "../../generalComponents/LazyInput/LazyInput"
import Textarea from "../../generalComponents/Textarea/Textarea"
import Select from "../../generalComponents/Select/Select"

export default function () {
  const [settingsData, setSettingsData] = useState({})
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = () => {
    Axios.get('http://localhost:3306/api/get').then(data => {
      if (data.data.length > 0) setTransactions([...data.data])
    })
  }

  const insertData = (key, data) => {
    const tempObj = {...settingsData}
    tempObj[key] = data
    setSettingsData(tempObj)
  }

  const postData = () => {
    Axios.post('http://localhost:3306/api/create', settingsData)
      .then((response) => {
        if (response.status === 200) getTransactions()
        else console.error(response)
      })
  }

  const delTransaction = (id) => {
    Axios.delete(`http://localhost:3306/api/delete${id}`)
      .then((response) => {
        if (response.status === 200) getTransactions()
      })
  }

  const showComment = (e, id) => {
    let comment

    transactions.filter(row => row.id === id && (comment = row.comment))

    const messageBox = `
      <div class="message" style="left: ${e.clientX - 380}px; top:${e.clientY - 20}px">
        <div class="message-close">&times;</div>
        <div class="message-body">${comment}</div>
      </div>
    `
    document.body.insertAdjacentHTML('beforeend', messageBox)
  }

  const handleNativeClickEvents = () => {
    document.body.addEventListener('click', e => {
      if (e.target.closest('.message-close')) e.target.closest('.message').remove()
    })
  }
  handleNativeClickEvents()

  return (
    <div className={styles.transactions}>
      <div className={styles.settings}>
        <div className={styles["settings__main"]}>
          <Select id="platform"
                  label="Платформа:"
                  onChange={(val) => insertData('platform', val)}
                  options={{'binance': 'Binance', 'bybit': 'ByBit', 'kucoin': 'KuCoin'}}/>

          <Select id="type"
                  label="Тип:"
                  onChange={(val) => insertData('transaction_type', val)}
                  options={{'buy': 'Покупка', 'sell': 'Продажа', 'exchange': 'Обмен'}}/>
        </div>

        <div className={styles["settings__additional"]}>
          <Select id="sell-coin"
                  label="Коин 1:"
                  options={{'usdt': 'USDT', 'bnb': 'BNB', 'busd': 'BUSD'}}
                  onChange={(val) => { insertData('sell_coin', val) }}/>

          {
            settingsData.transaction_type === 'exchange'
            && <Select id="buy-coin"
                       label="Коин 2:"
                       options={{'usdt': 'USDT', 'bnb': 'BNB', 'busd': 'BUSD'}}
                       onChange={(val) => { insertData('buy_coin', val) }}/>
          }


          <LazyInput id="order-price"
                     min={0} max={100000}
                     label="Цена:"
                     placeholder="Введите цену:"
                     onChange={(val) => { insertData("order_price", val) }}/>

          <LazyInput id="amount"
                     min={0}
                     max={100000}
                     label="Цена:"
                     placeholder="Введите кол-во:"
                     onChange={(val) => { insertData("amount", val) }}/>

          <LazyInput id="order-date"
                     inputType="date"
                     label="Дата:"
                     onChange={(val) => { insertData("order_date", val) }}/>

          <Textarea id="order-comment"
                    label="Ваш комментарий:"
                    rows={10}
                    onChange={(val) => { insertData("comment", val) }}/>
        </div>

        <button className={styles["settings__submit"]} onClick={postData}>Сохранить</button>
      </div>

      <div className={styles.table}>
        <div className={styles['table__head']}>
          <div className={styles["table__cell"]}>ID</div>
          <div className={styles["table__cell"]}>Platform</div>
          <div className={styles["table__cell"]}>Date</div>
          <div className={styles["table__cell"]}>Transaction type</div>
          <div className={styles["table__cell"]}>Coin 1</div>
          <div className={styles["table__cell"]}>Coin 2</div>
          <div className={styles["table__cell"]}>Price</div>
          <div className={styles["table__cell"]}>Amount</div>
        </div>
        <div className={styles["table__body-scroll"]}>
          <div className={styles['table__body']}>
            {
              transactions.map((row, i) => {
                return (
                  <div className={styles["table__row"]} key={row.id} data-text={row.comment}>
                    <button className={styles["table__row-comment"]} onClick={(e) => { showComment(e, row.id)} }>show comment</button>
                    <button className={styles["table__row-del"]} onClick={() => { delTransaction(row.id) }}>del</button>
                    <div className={styles["table__cell"]}>{row.id}</div>
                    <div className={styles["table__cell"]}>{row.platform}</div>
                    <div className={styles["table__cell"]}>{row.date}</div>
                    <div className={styles["table__cell"]}>{row.transaction_type}</div>
                    <div className={styles["table__cell"]}>{row.coin_1}</div>
                    <div className={styles["table__cell"]}>{row.coin_2 || '-'}</div>
                    <div className={styles["table__cell"]}>{row.price}</div>
                    <div className={styles["table__cell"]}>{row.amount}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <Link className="link" to="/">&larr; Go home</Link>
    </div>
  )
}