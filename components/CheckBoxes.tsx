import React from 'react'

const CheckBoxes = (props: any) => (
  <>
    <div className="flex items-center">
      <input id={props.id} type="checkbox" className={props.classNameInput} />
      <label htmlFor={props.id} className={props.classNameLabel}>
        {props.label}
      </label>
    </div>
  </>
)
export default CheckBoxes
