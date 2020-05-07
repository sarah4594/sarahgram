import React from 'react'

interface IconProps {
  label: string
  linecap?: string
  linejoin?: string
  width?: string
  stroke?: string
}

const Icons = ({
  children,
  label,
  fill = 'currentColor',
  linecap,
  linejoin,
  width,
  stroke,
  onClick,
}: any) => (
  <button
    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
    aria-label={label}
    onClick={onClick}
  >
    <svg
      className="h-6 w-6"
      fill={fill}
      viewBox="0 0 24 24"
      stroke-linecap={linecap}
      stroke-linejoin={linejoin}
      stroke-width={width}
      stroke={stroke}
    >
      {children}
    </svg>
  </button>
)

export default Icons
