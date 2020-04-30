import classNames from 'classnames'

const Button = ({ label, onClick, className }: any) => {
  const cn = classNames(
    className,
    'inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition ease-in-out duration-150',
    // {
    //   'text-white bg-purple-600 hover:bg-purple-500': true, //label = primary
    //   'border-purple-700 border-2 text-purple-700 bg-white hover:bg-purple-300': false, //label = secondary
    // },
  )
  return (
    <span className={classNames('inline-flex rounded-md shadow-sm', className)}>
      <button type="button" className={cn} onClick={onClick}>
        {label}
      </button>
    </span>
  )
}

export default Button
