import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Circle,
  Ellipse,
  Path,
  Mask,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"

export const ErrorIllustration = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={291}
    height={252}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Circle cx={147} cy={99} r={57} fill="#fff" />
      <Circle
        cx={147}
        cy={99}
        r={99}
        stroke="#686B89"
        strokeDasharray="2 9"
        strokeWidth={2}
        opacity={0.4}
      />
    </G>
    <Ellipse
      cx={124.674}
      cy={246}
      fill="url(#b)"
      fillOpacity={0.5}
      opacity={0.809}
      rx={92.415}
      ry={5}
    //   style={{
    //     mixBlendMode: "multiply",
    //   }}
    />
    <Path
      fill="url(#c)"
      fillRule="evenodd"
      d="M38.087 134.53c-2.8-6.006-.202-13.146 5.805-15.947l58.004-27.047 4.294 9.209 9.477 7.52.269 13.381 6.224 10.982.718 13.369 15.978 11.998.803 14.526 3.653 7.833-58.004 27.047c-6.006 2.801-13.146.203-15.947-5.804L38.087 134.53Z"
      clipRule="evenodd"
    />
    <Mask
      id="d"
      width={108}
      height={118}
      x={36}
      y={91}
      maskUnits="userSpaceOnUse"
    //   style={{
    //     maskType: "luminance",
    //   }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M38.087 134.53c-2.8-6.006-.202-13.146 5.805-15.947l58.004-27.047 4.294 9.209 9.477 7.52.269 13.381 6.224 10.982.718 13.369 15.978 11.998.803 14.526 3.653 7.833-58.004 27.047c-6.006 2.801-13.146.203-15.947-5.804L38.087 134.53Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#d)">
      <Circle
        cx={84.59}
        cy={184.565}
        r={8}
        fill="#fff"
        opacity={0.649}
        // style={{
        //   mixBlendMode: "overlay",
        // }}
        transform="rotate(-25 84.59 184.565)"
      />
      <Circle
        cx={92.747}
        cy={180.762}
        r={8}
        fill="#fff"
        opacity={0.649}
        // style={{
        //   mixBlendMode: "overlay",
        // }}
        transform="rotate(-25 92.747 180.762)"
      />
      <Path
        fill="#008A97"
        d="m42.313 143.593 77.943-36.345 6.761 14.501-77.942 36.345z"
      />
    </G>
    <Path
      fill="url(#e)"
      fillRule="evenodd"
      d="m193.964 132.113 54.379 25.357c6.006 2.801 8.605 9.941 5.804 15.947l-31.274 67.067c-2.801 6.007-9.94 8.605-15.947 5.804l-54.378-25.357 3.94-8.45 10.362-9.071-.851-11.324.021-10.694 8.608-7.811 6.006-12.88 9.109-6.386.035-13.224 4.186-8.978Z"
      clipRule="evenodd"
    />
    <Mask
      id="f"
      width={104}
      height={116}
      x={152}
      y={132}
      maskUnits="userSpaceOnUse"
    //   style={{
    //     maskType: "luminance",
    //   }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="m193.964 132.113 54.379 25.357c6.006 2.801 8.605 9.941 5.804 15.947l-31.274 67.067c-2.801 6.007-9.94 8.605-15.947 5.804l-54.378-25.357 3.94-8.45 10.362-9.071-.851-11.324.021-10.694 8.608-7.811 6.006-12.88 9.109-6.386.035-13.224 4.186-8.978Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#f)">
      <Path
        fill="#008A97"
        d="m184.667 152.052 65.254 30.429-6.762 14.5-65.254-30.428z"
      />
      <Path
        fill="#49FFEF"
        d="m181.601 203.584 36.252 16.905-2.113 4.531-36.252-16.904zM194.111 219.348l19.939 9.298-2.113 4.531-19.94-9.297z"
      />
    </G>
    <G opacity={0.5}>
      <Path
        fill="url(#g)"
        d="m273.989 155.425 9.664-5.215a2.052 2.052 0 0 0 .833-2.801 2.103 2.103 0 0 0-2.836-.821l-9.664 5.214a2.053 2.053 0 0 0-.833 2.802 2.103 2.103 0 0 0 2.836.821Z"
      />
      <Path
        fill="url(#h)"
        d="m264.707 144.106 6.708-8.695a2.052 2.052 0 0 0-.379-2.898 2.104 2.104 0 0 0-2.925.403l-6.707 8.695a2.051 2.051 0 0 0 .379 2.898 2.102 2.102 0 0 0 2.924-.403Z"
      />
      <Path
        fill="url(#i)"
        d="m276.156 168.266 10.977.316c1.15.033 2.1-.867 2.121-2.01a2.102 2.102 0 0 0-2.045-2.129l-10.976-.316a2.052 2.052 0 0 0-2.122 2.01 2.102 2.102 0 0 0 2.045 2.129Z"
      />
    </G>
    <G opacity={0.5}>
      <Path
        fill="url(#j)"
        d="m17.178 115.428-9.476-5.549a2.051 2.051 0 0 1-.734-2.828 2.102 2.102 0 0 1 2.863-.722l9.476 5.549a2.051 2.051 0 0 1 .734 2.828 2.102 2.102 0 0 1-2.863.722Z"
      />
      <Path
        fill="url(#k)"
        d="m26.85 104.44-6.4-8.924a2.051 2.051 0 0 1 .48-2.883 2.103 2.103 0 0 1 2.908.505l6.4 8.924a2.052 2.052 0 0 1-.48 2.883 2.104 2.104 0 0 1-2.908-.505Z"
      />
      <Path
        fill="url(#l)"
        d="m14.565 128.186-10.981-.068a2.051 2.051 0 0 1-2.05-2.082 2.103 2.103 0 0 1 2.118-2.057l10.98.068a2.051 2.051 0 0 1 2.051 2.082 2.103 2.103 0 0 1-2.118 2.057Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={79.017}
        x2={217.09}
        y1={249.735}
        y2={249.735}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#AAABC9" stopOpacity={0.01} />
        <Stop offset={1} stopColor="#0E154B" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={98.179}
        x2={57.335}
        y1={89.783}
        y2={166.541}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00DACB" />
        <Stop offset={1} stopColor="#00C7DA" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={253.708}
        x2={171.559}
        y1={156.486}
        y2={171.391}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00DACB" />
        <Stop offset={1} stopColor="#00C7DA" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={284.706}
        x2={270.774}
        y1={146.298}
        y2={146.541}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8FA1B0" />
        <Stop offset={1} stopColor="#5F7083" />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={270.785}
        x2={258.156}
        y1={131.409}
        y2={137.298}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8FA1B0" />
        <Stop offset={1} stopColor="#5F7083" />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={290}
        x2={277.813}
        y1={165.72}
        y2={158.965}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8FA1B0" />
        <Stop offset={1} stopColor="#5F7083" />
      </LinearGradient>
      <LinearGradient
        id="j"
        x1={6.787}
        x2={20.702}
        y1={105.933}
        y2={106.662}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8FA1B0" />
        <Stop offset={1} stopColor="#5F7083" />
      </LinearGradient>
      <LinearGradient
        id="k"
        x1={21.219}
        x2={33.634}
        y1={91.539}
        y2={97.865}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8FA1B0" />
        <Stop offset={1} stopColor="#5F7083" />
      </LinearGradient>
      <LinearGradient
        id="l"
        x1={0.818}
        x2={13.233}
        y1={125.158}
        y2={118.832}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#8FA1B0" />
        <Stop offset={1} stopColor="#5F7083" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M48 0h198v198H48z" />
      </ClipPath>
    </Defs>
  </Svg>
);
