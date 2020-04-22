const Button = (props: any) => (
  <div>
    <span className={props.classNameSpan}>
      <button
        type="button"
        className={props.classNameButton}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </span>
  </div>
)

export default Button
