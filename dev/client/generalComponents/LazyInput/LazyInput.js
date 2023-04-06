import React, {useEffect, useRef} from "react"
import styles from "./LazyInput.module.css"

export default function LazyInput({ id, min, max, onChange, label, defaultValue = '', inputType = "text", placeholder = '' }) {
  const inpRef = useRef()

  const parseDefaultValStr = () => {
    const val = parseFloat(inpRef.current.value)

    validate(isNaN(val) ? min : val)
  }

  function validate(val) {
    if (inputType === 'date') onChange(val)
    else {
      const validNum = Math.max(min, Math.min(max, val))

      inpRef.current.value = validNum
      onChange(validNum)
    }
  }

  useEffect(() => {
    inpRef.current.value = defaultValue
  }, [defaultValue])

  return (
    <div className={styles['input-wrap']}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <input ref={inpRef} type={inputType} defaultValue={defaultValue} placeholder={placeholder} onBlur={parseDefaultValStr} />
    </div>
  )

}