import type { ReactElement } from 'react'
import React from 'react'
import { ICONS_MAPPING, TYPE_MAPPING } from './consts'
import classnames from 'classnames'
import { Text } from '../Text'
import { Button } from '../Button'
import type { TAlertProps } from './types'
import { IconDynamicComponent } from '../../helperComponents'
import { Link } from '../Link'
import { ButtonIcon } from '../ButtonIcon'
import IconDismiss from '../SVGIcons/IconDismiss'

export const Alert = (props: TAlertProps): ReactElement => {
  const {
    buttonProps,
    iconProps,
    type = 'information',
    position = 'inline',
    text,
    subtext,
    closeIcon,
    onClose,
    className = '',
    linkAddons
  } = props

  return (
    <div className={classnames('alert', `alert--${type} alert--${position}`, className)}>
      <div className={classnames('alert__content')}>
        <div className={'alert__content__inner'}>
          <div className={'alert__content__left'}>
            {iconProps?.Component ? (
              <iconProps.Component size="medium" type={TYPE_MAPPING[type]} />
            ) : (
              <IconDynamicComponent
                componentName={ICONS_MAPPING[type]}
                size="medium"
                type={TYPE_MAPPING[type]}
              />
            )}
            <div className="alert__text pl-12">
              {text ? (
                <Text type="primary" weight="regular" className={'mt-2'}>
                  {text}
                </Text>
              ) : null}
              {subtext ? (
                <Text className={'mt-2'} type="secondary" size="small" weight="regular">
                  {subtext}
                </Text>
              ) : null}
              {linkAddons ? <Link className={'mt-4'} {...linkAddons} /> : null}
            </div>
          </div>
          {buttonProps ? (
            <div className="alert__actions">
              {buttonProps.confirm && (
                <Button size="medium" type="secondary" {...buttonProps.confirm} />
              )}
              {buttonProps.cancel && (
                <Button size="medium" type="tertiary" className="ml-12" {...buttonProps.cancel} />
              )}
            </div>
          ) : null}
        </div>

        {closeIcon ? (
          <ButtonIcon iconProps={{ Component: IconDismiss }} size={'small'} onClick={onClose} />
        ) : null}
      </div>
    </div>
  )
}
