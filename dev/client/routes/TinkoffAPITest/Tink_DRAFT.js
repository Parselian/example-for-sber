import React, {useState, useEffect} from "react"
import styles from "./Tink.module.css"
import LazyInput from "../../generalComponents/LazyInput/LazyInput"

export default function TinkTable() {
  let [investAmount, setInvestAmount] = useState(100),
    [volume, setVolume] = useState(1),
    [liquidity, setLiquidity] = useState(1),
    [apr, setApr] = useState(13.21),
    [result, setResult] = useState(0)

  function setNewVal(newVal, callback) {
    callback(newVal)
  }

  function getFinal() {
    setResult(+(investAmount / 100) * apr * (volume / (liquidity + investAmount)) / 360)
  }

  useEffect(() => {
    getFinal()
  }, [investAmount, volume, liquidity, apr])

  return (
    <div className={styles["tink"]}>
      <div className={styles["tink__inputs"]}>
        <LazyInput id="invest-amount"
                   min={0} max={100000}
                   label="Invest amount:"
                   placeholder="Invest amount:"
                   onChange={(val) => setNewVal(val, setInvestAmount)}/>
        <hr/>
        <LazyInput id="volume"
                   min={0} max={100000}
                   label="Value:"
                   placeholder="Value:"
                   onChange={(val) => setNewVal(val, setVolume)}/>
        <hr/>
        <LazyInput id="liquidity"
                   min={0} max={100000}
                   label="Liquidity:"
                   placeholder="Liquidity:"
                   onChange={(val) => setNewVal(val, setLiquidity)}/>
        <hr/>
        <LazyInput id="apr"
                   min={0} max={100000}
                   label="APR:"
                   placeholder="APR:"
                   onChange={(val) => setNewVal(val, setApr)}/>
      </div>
      <hr/>
      <hr/>
      <hr/>
      <div className="tink__result">
        <span style={{"display": "block"}}>Result</span>
        <span>{result}</span>
      </div>
    </div>
  )
}