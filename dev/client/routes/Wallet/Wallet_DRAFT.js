import React from "react"
import styles from "./Wallet.module.css"
import Select from "../../generalComponents/Select/Select";
import LazyInput from "../../generalComponents/LazyInput/LazyInput";

export default function Wallet() {
  const performData = (val) => {
    console.log('here')
  }
  return (
    <div className={styles["wallet"]}>
      <div className={styles["wallet__income"]}>
        <Select id="type"
                label="Type:"
                options={{'pools': 'Pools', 'liquidity': 'Liquidity'}}
                onChange={(val) => {
                  performData('stacking_type', val)
                }}/>

        <hr/>
        <LazyInput id="coin"
                   min={0} max={100000}
                   label="Coin:"
                   placeholder="Enter coin name:"
                   onChange={(val) => {
                     performData("coin_name", val)
                   }}/>

        <LazyInput id="amount"
                   min={0} max={100000}
                   label="amount:"
                   placeholder="Enter coin`s amount:"
                   onChange={(val) => {
                     performData("coin_amount", val)
                   }}/>

        <LazyInput id="price"
                   min={0} max={100000}
                   label="price:"
                   placeholder="Enter coin`s price:"
                   onChange={(val) => {
                     performData("coin_price", val)
                   }}/>
      </div>

      <div className={styles["wallet__output"]}>
        <div className={styles["wallet__output-settings"]}>

        </div>
        <div className={styles['table']}>
          <div className={styles['table__head']}>
            <div className={styles["table__cell"]}>Coin</div>
            <div className={styles["table__cell"]}>Quantity</div>
            <div className={styles["table__cell"]}>Average price</div>
          </div>
          <div className={styles["table__body-scroll"]}>
            <div className={styles['table__body']}>
              <div className={styles["table__row"]}>
                <div className={styles["table__cell"]}>USDT</div>
                <div className={styles["table__cell"]}>100</div>
                <div className={styles["table__cell"]}>74</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}