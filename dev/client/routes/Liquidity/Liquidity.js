import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import LazyInput from "../../generalComponents/LazyInput/LazyInput"
import styles from "./Liquidity.module.css"
import Axios from "axios"

export default function () {
  const [pools, setPools] = useState([])
  const defaultGlobalVal = 100

  const performDailyProfit = (amount, apr, volume, liquidity) => {
    return ((+amount / 100) * (+apr * 100) * (+volume / (+liquidity + +amount)) / 360).toFixed(8)
  }

  useEffect(() => {
    fetchPools().then(data => {
      data = data.map(pool => ({
        ...pool,
        investAmount: +defaultGlobalVal,
        dailyProfit: performDailyProfit(pool.investAmount, pool.APR, pool.volume, pool.liquidity)
      })).sort((a, b) => a.dailyProfit < b.dailyProfit ? 1 : -1)
      setPools(data)
    })
  }, [])

  const updGlobalInvestAmount = (val) => {
    setPools(pools.map(pool => (
      {
        ...pool,
        investAmount: +val,
        dailyProfit: performDailyProfit(pool.investAmount, pool.APR, pool.volume, pool.liquidity)
      })).sort((a, b) => a.dailyProfit < b.dailyProfit ? 1 : -1))
  }

  const updInvestAmount = (poolName, investAmount) => {
    setPools(pools.map(pool => pool.poolName !== poolName ? pool : {
      ...pool,
      investAmount
    }))
  }

  return (
    <>
      <div className={styles.settings}>
        <LazyInput min={0}
                   label="Invest amount: "
                   id="invest-amount"
                   max={Infinity}
                   defaultValue={defaultGlobalVal}
                   onChange={(val) => {
                     updGlobalInvestAmount(val)
                   }}/>
      </div>
      <div className={styles.table}>
        <div className={styles["table__head"]}>
          <div className={styles["table__cell"]}>Валютная пара</div>
          <div className={styles["table__cell"]}>Вложение (USDT)</div>
          <div className={styles["table__cell"]}>Доход за день (USDT)</div>
        </div>
        <div className={styles["table__body_scroll"]}>
          <div className={styles["table__body"]}>
            {
              pools.map(pool => {
                return (
                  <div className={styles["table__row"]} key={pool['poolName']}>
                    <div className={styles["table__cell"]}>{pool['poolName']}</div>
                    <div className={styles["table__cell"]}>
                      <LazyInput min={0} max={pool['volume']} defaultValue={pool['investAmount']} onChange={(val) => {
                        updInvestAmount(pool['poolName'], val)
                      }}/>
                    </div>
                    <div className={styles["table__cell"]}>
                      {performDailyProfit(pool.investAmount, pool.APR, pool.volume, pool.liquidity)}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <Link className="link" to="/">&larr; Go home</Link>
    </>
  )
}


async function fetchPools() {
  try {
    const response = await Axios.get('http://localhost:3306/api/get/liquid-swap-pools')
    return response.data
  } catch (err) {
    console.error(err)
  }
}