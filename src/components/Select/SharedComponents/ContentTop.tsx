import type { JSX } from 'react'
import React, { useMemo } from 'react'
import { Text } from '../../Text'
import { Input } from '../../Input'
import type { TMenuItem } from '../../Menu/types'
import type { TSelectTranslations } from '../types'
import { Actions } from './Actions'
import IconDismissFilled from '../../SVGIcons/IconDismissFilled'
import IconSearchFilled from '../../SVGIcons/IconSearchFilled'
import IconSelectAllOff from '../../SVGIcons/IconSelectAllOff'
import type { TCallBackFn, TChangeEventType } from '../../../types/globalTypes'

type TProps = {
  searchValue?: string
  helperText?: string
  selectAll?: TCallBackFn
  setSearchValue?: (value: string) => void
  clearAll?: TCallBackFn
  isSelectAllDisabled?: boolean
  isAnySelected?: boolean
  translations?: TSelectTranslations
  isSearchAvailable?: boolean
  hasLimitation?: boolean
  menuOptions?: TMenuItem[]
  dataIdPrefix?: string
}

export const ContentTop = React.memo<TProps>((props: TProps): JSX.Element => {
  const {
    clearAll,
    selectAll,
    helperText,
    searchValue,
    translations,
    isAnySelected,
    setSearchValue,
    isSearchAvailable = false,
    hasLimitation = false,
    isSelectAllDisabled = false,
    menuOptions = [],
    dataIdPrefix
  } = props

  const { searchInputPlaceHolder, innerLabel, clearAllLabel, selectAllLabel } = translations || {}

  const selectActions = useMemo(() => {
    let options: TMenuItem[] = menuOptions

    if (selectAll && selectAllLabel && !hasLimitation) {
      options = [
        {
          label: selectAllLabel,
          value: 1,
          handler: selectAll,
          disabled: isSelectAllDisabled,
          iconProps: { Component: IconSelectAllOff },
          dataId: dataIdPrefix ? `${dataIdPrefix}-select-all` : ''
        }
      ]
    }
    if (clearAll && clearAllLabel) {
      options = [
        ...options,
        {
          label: clearAllLabel,
          value: 2,
          handler: clearAll,
          disabled: !isAnySelected,
          iconProps: { Component: IconDismissFilled },
          dataId: dataIdPrefix ? `${dataIdPrefix}-clear-all` : ''
        }
      ]
    }
    return options
  }, [
    menuOptions,
    selectAllLabel,
    selectAll,
    clearAll,
    clearAllLabel,
    isSelectAllDisabled,
    isAnySelected,
    dataIdPrefix
  ])
  const onSearch = (e: TChangeEventType) => {
    setSearchValue && setSearchValue(e.target.value)
  }

  const removeFilter = () => setSearchValue && setSearchValue('')

  return (
    <div className="content-top">
      {helperText ? (
        <Text size="xsmall" type="secondary" className="content-top__label">
          {helperText}
        </Text>
      ) : null}
      {isSearchAvailable && (
        <Input
          className="content-top__search"
          size="small"
          placeholder={searchInputPlaceHolder}
          handleChange={onSearch}
          currentValue={searchValue}
          rightIconProps={{
            Component: searchValue ? IconDismissFilled : IconSearchFilled,
            size: searchValue ? 'xsmall' : 'small',
            onClick: removeFilter
          }}
        />
      )}

      <Actions selectActions={selectActions} innerLabel={innerLabel} />
    </div>
  )
})

ContentTop.displayName = 'ContentTop'
