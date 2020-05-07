const UserIcons = (props: any) => (
  <div className={props.className}>
    <img className="m-2 h-8 w-8 rounded-full" src={props.src} alt="" />
    {props.children}
  </div>
)

export default UserIcons
