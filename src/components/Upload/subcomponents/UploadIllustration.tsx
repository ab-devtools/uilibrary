import type { ReactElement } from 'react'
import React, { useId } from 'react'
import classnames from 'classnames'

interface TUploadIllustrationProps {
  className?: string
}

export const UploadIllustration = ({
  className = ''
}: TUploadIllustrationProps): ReactElement => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')

  const filter0 = `upload-illu-f0-${uid}`
  const filter1 = `upload-illu-f1-${uid}`
  const filter2 = `upload-illu-f2-${uid}`
  const clip0 = `upload-illu-c0-${uid}`
  const clip1 = `upload-illu-c1-${uid}`
  const clip2 = `upload-illu-c2-${uid}`

  return (
    <svg
      className={classnames('upload__illustration', className)}
      width="244"
      height="174"
      viewBox="0 0 244 174"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g filter={`url(#${filter0})`}>
        <rect
          width="67.0079"
          height="79.8735"
          rx="10.8938"
          transform="matrix(0.965749 -0.259478 0.258161 0.966102 35.6882 60.7599)"
          fill="#FEFEFE"
          shapeRendering="crispEdges"
        />
        <rect
          x="0.555545"
          y="0.320743"
          width="66.1001"
          height="78.9657"
          rx="10.4399"
          transform="matrix(0.965749 -0.259478 0.258161 0.966102 35.6244 60.9149)"
          stroke="#ECECEC"
          strokeWidth="0.907819"
          strokeLinecap="round"
          shapeRendering="crispEdges"
        />
        <g clipPath={`url(#${clip0})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M66.5929 70.3704L74.8086 68.2761L83.4094 73.1525L86.8666 86.0899C87.3032 87.7238 86.2429 89.4255 84.5018 89.8933L72.66 93.075C70.9129 93.5444 69.1462 92.6023 68.7096 90.9684L64.2222 74.1754C63.7855 72.5415 64.8458 70.8398 66.5929 70.3704Z"
            fill="#ECECEC"
          />
          <path
            d="M76.0326 72.7981L74.7949 68.1664L83.4093 73.1522L78.8798 74.3692C76.8415 74.9169 76.1324 73.55 76.0326 72.7981Z"
            fill="#DDDDDD"
          />
        </g>
        <rect
          width="45.391"
          height="5.44692"
          rx="2.72346"
          transform="matrix(0.965749 -0.259478 0.258161 0.966102 58.7821 105.316)"
          fill="#ECECEC"
        />
        <rect
          width="27.2346"
          height="5.44692"
          rx="2.72346"
          transform="matrix(0.965749 -0.259478 0.258161 0.966102 70.3617 113.485)"
          fill="#ECECEC"
        />
      </g>

      <g filter={`url(#${filter1})`}>
        <rect
          width="67.0079"
          height="79.8735"
          rx="10.8938"
          transform="matrix(0.965749 0.259478 -0.258161 0.966102 142.975 43.5753)"
          fill="#FEFEFE"
          shapeRendering="crispEdges"
        />
        <rect
          x="0.321181"
          y="0.556303"
          width="66.1001"
          height="78.9657"
          rx="10.4399"
          transform="matrix(0.965749 0.259478 -0.258161 0.966102 143.13 43.5108)"
          stroke="#ECECEC"
          strokeWidth="0.907819"
          strokeLinecap="round"
          shapeRendering="crispEdges"
        />
        <g clipPath={`url(#${clip1})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M164.948 67.3917L173.107 69.697L178.124 78.2323L174.667 91.1697C174.23 92.8036 172.464 93.7457 170.723 93.2779L158.881 90.0962C157.134 89.6268 156.073 87.9252 156.51 86.2913L160.997 69.4983C161.434 67.8643 163.201 66.9222 164.948 67.3917Z"
            fill="#ECECEC"
          />
          <path
            d="M171.912 74.2272L173.15 69.5955L178.124 78.2323L173.595 77.0153C171.556 76.4677 171.624 74.9284 171.912 74.2272Z"
            fill="#DDDDDD"
          />
        </g>
        <rect
          width="45.391"
          height="5.44692"
          rx="2.72346"
          transform="matrix(0.965749 0.259478 -0.258161 0.966102 140.758 93.7404)"
          fill="#ECECEC"
        />
        <rect
          width="27.2346"
          height="5.44692"
          rx="2.72346"
          transform="matrix(0.965749 0.259478 -0.258161 0.966102 146.713 106.62)"
          fill="#ECECEC"
        />
      </g>

      <g filter={`url(#${filter2})`}>
        <rect
          x="89.3906"
          y="38.1284"
          width="66.9957"
          height="79.8881"
          rx="10.8938"
          fill="#FEFEFE"
          shapeRendering="crispEdges"
        />
        <rect
          x="89.8445"
          y="38.5823"
          width="66.0878"
          height="78.9803"
          rx="10.4399"
          stroke="#ECECEC"
          strokeWidth="0.907819"
          strokeLinecap="round"
          shapeRendering="crispEdges"
        />
        <g clipPath={`url(#${clip2})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M116.761 55.428L125.239 55.5372L132.289 62.4783V75.8697C132.289 77.5609 130.825 78.9292 129.023 78.9292H116.761C114.952 78.9292 113.488 77.5609 113.488 75.8697V58.4875C113.488 56.7962 114.952 55.428 116.761 55.428Z"
            fill="#ECECEC"
          />
          <path
            d="M125.254 60.2222V55.428L132.289 62.4783H127.599C125.488 62.4783 125.156 60.9743 125.254 60.2222Z"
            fill="#DDDDDD"
          />
        </g>
        <rect
          x="100.193"
          y="87.1506"
          width="45.391"
          height="5.44692"
          rx="2.72346"
          fill="#ECECEC"
        />
        <rect
          x="109.271"
          y="98.0444"
          width="27.2346"
          height="5.44692"
          rx="2.72346"
          fill="#ECECEC"
        />
      </g>

      <defs>
        <filter
          id={filter0}
          x="-2.44024"
          y="5.24439"
          width="161.59"
          height="170.81"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1.81564"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="18.1564" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.305882 0 0 0 0 0.305882 0 0 0 0 0.305882 0 0 0 0.12 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>

        <filter
          id={filter1}
          x="84.2268"
          y="5.44691"
          width="161.59"
          height="170.81"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1.81564"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="18.1564" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.305882 0 0 0 0 0.305882 0 0 0 0 0.305882 0 0 0 0.12 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>

        <filter
          id={filter2}
          x="51.2622"
          y="0"
          width="143.252"
          height="156.145"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1.81564"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="18.1564" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.305882 0 0 0 0 0.305882 0 0 0 0 0.305882 0 0 0 0.12 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>

        <clipPath id={clip0}>
          <rect
            width="23.5012"
            height="23.5012"
            fill="white"
            transform="matrix(0.965749 -0.259478 0.258161 0.966102 61.1626 71.8287)"
          />
        </clipPath>
        <clipPath id={clip1}>
          <rect
            width="23.5012"
            height="23.5012"
            fill="white"
            transform="matrix(0.965749 0.259478 -0.258161 0.966102 159.518 65.9332)"
          />
        </clipPath>
        <clipPath id={clip2}>
          <rect width="23.5012" height="23.5012" fill="white" transform="translate(111.138 55.428)" />
        </clipPath>
      </defs>
    </svg>
  )
}
