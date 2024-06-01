import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"

export const ExpenseIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Rect width={48} height={48} fill="#FCFCFC" rx={16} />
    <Path
      fill="#FF5449"
      d="M31.198 22h-14a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-6a5 5 0 0 0-5-5Zm-7 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
    />
    <Path
      fill="#FF5449"
      d="M24.198 32a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM24.907 10.29a1.002 1.002 0 0 0-1.42 0l-4.24 4.25a1.015 1.015 0 0 0 1.41 1.46l2.54-2.59V19a1 1 0 1 0 2 0v-5.59l2.54 2.59a1 1 0 0 0 .7.29.998.998 0 0 0 .76-1.7l-4.29-4.3Z"
    />
  </Svg>
)
