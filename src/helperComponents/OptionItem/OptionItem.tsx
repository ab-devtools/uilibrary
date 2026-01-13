import type { JSX } from 'react'
import React, { useCallback } from 'react'
import { Checkbox } from '../../components/Checkbox'
import { Avatar } from '../../components/Avatar'
import { Tooltip } from '../../components/Tooltip'
import type { TSelectItemProps } from './types'
import classNames from 'classnames'
import { IconCheckmark } from '../../components/SVGIcons/IconCheckmark'
import { Radio } from '../../components/Radio'
import type { TClickEventType } from '../../types/globalTypes'

export const OptionItem = (props: TSelectItemProps): JSX.Element => {
  const {
    data,
    onClick,
    disabled,
    avatar,
    isSelected,
    labelLeftIconProps,
    optionLeftIcon,
    LabelRightIconComponent,
    OptionRightIconComponent,
    isCheckbox,
    isRadio,
    className = '',
    tooltipAddons,
    dataId = '',
    withTitleOption = false
  } = props

  const { label, meta, value } = data

  const handleClick = useCallback(
    (e: TClickEventType) => {
      e.preventDefault()
      e.stopPropagation()

      if (disabled) {
        return
      }
      onClick({ value, label })
    },
    [disabled, value, label, onClick]
  )

  const optionContent = (
    <div
      title={withTitleOption ? `${label}` : ''}
      data-id={dataId}
      id={`${value}`}
      className={classNames(
        'select__option',
        {
          'select__option--disabled': disabled
        },
        className
      )}
      onClick={handleClick}
    >
      {isCheckbox ? (
        <Checkbox className="mr-8" selectedValue={isSelected} disabled={disabled} />
      ) : null}
      {isRadio ? <Radio className="mr-8" isSelected={isSelected} disabled={disabled} /> : null}
      {!isCheckbox && !isRadio && isSelected ? (
        <IconCheckmark
          size="xsmall"
          type={disabled ? 'disabled' : 'brand-light'}
          className="mr-8"
        />
      ) : null}
      <div className="select__option__inner">
        {optionLeftIcon && optionLeftIcon.Component ? (
          <optionLeftIcon.Component {...optionLeftIcon} size="small" className="mr-8" />
        ) : null}
        {avatar ? <Avatar size="xxsmall" imagePath={avatar} className="mr-4" /> : null}
        {labelLeftIconProps?.Component ? (
          <labelLeftIconProps.Component
            size="xsmall"
            type={disabled ? 'disabled' : 'primary'}
            className="mr-4"
            {...labelLeftIconProps}
          />
        ) : null}
        <div className="select__option__content" data-id={dataId}>
          <span className={`select__option__text pr-4 ${disabled ? 'color-disabled' : ''}`}>
            {label}
          </span>
          {LabelRightIconComponent && LabelRightIconComponent(value)}

          {meta ? (
            <span className={`select__option__meta ${disabled ? 'color-disabled' : ''}`}>
              {meta}
            </span>
          ) : null}
        </div>
      </div>
      {OptionRightIconComponent && OptionRightIconComponent(value)}
    </div>
  )

  return tooltipAddons ? (
    <>
      <Tooltip {...tooltipAddons} text={`${label}`} id={`${value}`} />
      {optionContent}
    </>
  ) : (
    optionContent
  )
}
