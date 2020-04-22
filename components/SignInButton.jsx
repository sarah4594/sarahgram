const SignInButton = (props) => (
  <div>
    <span className="w-full inline-flex rounded-md shadow-sm">
      <button type="button" className={props.className} onClick={props.onClick}>
        {props.children}
      </button>
    </span>
  </div>
)

export default SignInButton
