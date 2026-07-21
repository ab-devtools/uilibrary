import type { ReactElement } from 'react'
import React from 'react'
import classnames from 'classnames'

interface TUploadIllustrationSmallProps {
  className?: string
}

export const UploadIllustrationSmall = ({
  className = ''
}: TUploadIllustrationSmallProps): ReactElement => (
  <svg
    className={classnames('upload__illustration upload__illustration--small', className)}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="48" height="48" rx="12" fill="#EEF0F2" />
    <path
      d="M20 14C18.3431 14 17 15.3431 17 17V31C17 32.6569 18.3431 34 20 34H28C29.6569 34 31 32.6569 31 31V21.4142C31 20.6186 30.6839 19.8555 30.1213 19.2929L25.7071 14.8787C25.1445 14.3161 24.3814 14 23.5858 14H20Z"
      fill="#FFFFFF"
      stroke="#8A94A6"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M24 14.5V19C24 20.1046 24.8954 21 26 21H30.5"
      stroke="#8A94A6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 30V24M24 24L21.5 26.5M24 24L26.5 26.5"
      stroke="#8A94A6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default UploadIllustrationSmall
