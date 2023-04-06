import React from "react"
import styles from "./Select.module.css"

export default function Select({id, label, options, onChange}) {
  return (
    <div className={styles['select-wrap']}>
      {label && <label htmlFor={id} className={styles.label} >{label}</label>}
      <select id={id} onChange={(e) => onChange(e.target.value)} >
        {
          Object.keys(options).map(key => (
            <option value={key} key={key}>{options[key]}</option>
          ))
        }
      </select>
    </div>
  )
}