import React, {useRef} from "react"
import styles from "./Textarea.module.css"

export default function Textarea({id, label, onChange, rows = 10, placeholder = "Ваше сообщение:"}) {
  const ref = useRef()

  const parseStr = (str) => {
    str = str.replace(/(&|<|>|\"|\'|\^|\@|\#|%)/gi, '')
    onChange(str)
  }
  return (
    <div className={styles['textarea-wrap']}>
      {label && <label htmlFor={id} className={styles.label}>Ваш комментарий:</label>}
      <textarea id={id} ref={ref} rows={rows} onBlur={(e) => parseStr(e.target.value)} placeholder={placeholder}/>
    </div>
  )
}