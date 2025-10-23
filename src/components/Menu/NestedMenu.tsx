import type { ReactElement } from 'react'
import React, { useId, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  useOnOutsideClick,
  useGetElemSizes,
  useGetTooltipPosition,
  useGetElemPositions,
  useHideOnScroll
} from '../../hooks'
import type { TMenuItem, TNestedMenuProps } from './types'
import classNames from 'classnames'
import { CollapseGroup } from '../Collapse'
import { OptionItem } from '../../helperComponents'

export const NestedMenu = ({
  additionalRef = null,
  menuItems = [],
  parentRef,
  onClose,
  isOpen,
  position = 'bottom-right',
  className = ''
}: TNestedMenuProps): ReactElement | null => {
  const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null)
  useOnOutsideClick([menuRef, additionalRef], onClose, !!isOpen, useId())
  useHideOnScroll(onClose)

  const { left, top } = useGetElemPositions(parentRef)
  const { width, height } = useGetElemSizes(parentRef)
  const { width: menuWidth, height: menuHeight } = useGetElemSizes(menuRef)

  const tooltipPosition = useGetTooltipPosition({
    tooltipRef: menuRef,
    elemRef: parentRef,
    initialPosition: position,
    hasTriangle: false
  })

  const menuStyles = useMemo(() => {
    if (tooltipPosition === 'bottom-right') {
      return { left: left + 4, top: top + 4 + height }
    }
    if (tooltipPosition === 'bottom-left') {
      return { right: 0, top: top + 4 + height }
    }
    if (tooltipPosition === 'top-right') {
      return { left: left + 4, top: top - menuHeight - 4 }
    }
    if (tooltipPosition === 'top-left') {
      return { left: left - menuWidth + width, top: top - menuHeight - 4 }
    }

    return { left: left, top: top + 4 + height }
  }, [left, top, width, tooltipPosition, menuWidth, height, menuHeight])

  if (!parentRef || !isOpen) {
    return null
  }

  const _menuItems = menuItems.map((item, index) => {
    return {
      ...item,
      content: item.subItems ? (
        <div className="nested-menu__sub-items select">
          {item.subItems.map(
            ({ label, meta, value, handler, iconProps, disabled, dataId }: TMenuItem) => {
              return (
                <OptionItem
                  dataId={dataId}
                  disabled={disabled}
                  key={`${index}-${value}`}
                  data={{
                    label,
                    value,
                    meta
                  }}
                  labelLeftIconProps={iconProps}
                  onClick={() => {
                    onClose()
                    handler?.()
                  }}
                  className="nested-menu__sub-item"
                />
              )
            }
          )}
        </div>
      ) : null
    }
  })

  return ReactDOM.createPortal(
    <div className={classNames('nested-menu', className)} style={menuStyles} ref={setMenuRef}>
      <CollapseGroup items={_menuItems} />
    </div>,
    parentRef
  )
}
