import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

export const IncomeIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Rect width={48} height={48} fill="#FCFCFC" rx={16} />
    <Path
      fill="#5FDBBA"
      d="M31 22H17a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5Zm-7 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
    />
    <Path
      fill="#5FDBBA"
      d="M24 32a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM24 10a1 1 0 0 0-1 1v5.59l-2.54-2.54a1 1 0 0 0-1.41 1.41l4.24 4.25c.092.09.2.161.32.21a1 1 0 0 0 .78 0 .998.998 0 0 0 .32-.21L29 15.46a1 1 0 0 0-1.41-1.41L25 16.59V11a1 1 0 0 0-1-1Z"
    />
  </Svg>
)
