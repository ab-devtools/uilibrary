import type { ReactElement } from 'react'
import React, { useState, useRef } from 'react'
import { Popover } from '../Popover'
import type { TCopyProps } from './types'
import { IconCopy } from '../SVGIcons/IconCopy'
import { ButtonIcon } from '../ButtonIcon'

export const Copy = ({
  textAfterCopy,
  className = '',
  text,
  dataId,
  size = 'medium',
  type = 'tertiary'
}: TCopyProps): ReactElement => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false)
  const copyIconRef = useRef<HTMLDivElement | null>(null)

  const copy = (e: TClickEventType) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setTooltipVisibility(true)
    setTimeout(() => setTooltipVisibility(false), 3000)
  }

  return (
    <div ref={copyIconRef} className="copy-icon">
      <ButtonIcon
        dataId={dataId}
        iconProps={{
          Component: IconCopy,
          type
        }}
        size={size}
        className={className}
        onClick={copy}
      />
      {isTooltipVisible ? (
        <Popover
          clicked
          elemRef={copyIconRef.current as HTMLElement}
          text={textAfterCopy || 'Copied'}
          position={'top-center'}
        />
      ) : null}
    </div>
  )
}
