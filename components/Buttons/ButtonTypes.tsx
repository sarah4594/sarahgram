import Button from '../Button'

const PrimaryButton = (props: any) => (
  <Button
    classNameSpan="w-full inline-flex rounded-md shadow-sm"
    classNameButton="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out"
    onClick={props.onClick}
  >
    {props.children}
  </Button>
)

const SecondaryButton = (props: any) => (
  <Button
    classNameSpan="block w-full rounded-md shadow-sm"
    classNameButton="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md border-purple-700 border-2 text-purple-700 bg-white hover:bg-purple-300 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700 transition duration-150 ease-in-out"
    onClick={props.onClick}
  >
    {props.children}
  </Button>
)

export { PrimaryButton, SecondaryButton }
