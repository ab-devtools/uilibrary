/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ReactElement, useEffect, useState } from 'react'
import {Badge, ButtonIcon, NavigationItem, SideNavigation as _SideNavigation, Text} from '../index'
import { Block } from '../components/SideNavigation/Block'
import { NavigationItemTypes } from '../components/SideNavigation/NavigationItem/types'
// @ts-ignore
import logoImg from '../assets/images/logo.svg'
// @ts-ignore
import logoClosedImg from '../assets/images/logo-closed.svg'

import IconDocument from '../components/SVGIcons/IconDocument'
import IconLockClosed from '../components/SVGIcons/IconLockClosed'
import IconHome from '../components/SVGIcons/IconHome'
import IconSavings from '../components/SVGIcons/IconSavings'
import IconWallet from '../components/SVGIcons/IconWallet'
import { StoryFn } from '@storybook/react'
import { TSideNavigationPropTypes } from '../components/SideNavigation/types'
import IconDocumentFilled from '../components/SVGIcons/IconDocumentFilled'
import IconAdd from '../components/SVGIcons/IconAdd'
import IconMore from '../components/SVGIcons/IconMore'
import IconNavigation from '../components/SVGIcons/IconNavigation'
import { isMobile } from '../utils/helpers'
import { useSideNavigationControls } from '../hooks/useSideNavigation'

export default {
  title: 'Side Navigation',
  component: _SideNavigation,
  argTypes: {}
}

const Template: StoryFn<TSideNavigationPropTypes> = (args) => {
  const { onOpen, isOpen, onClose, onMouseEnter, onMouseLeave, onPin, isPined } =
    useSideNavigationControls()

  const [isNavigationItemOpen, setNavigationItemOpen] = useState(false)

  useEffect(() => {
    if (!isMobile()) {
      onPin?.()
      onOpen?.(true)
    }
  }, [])

  return (
    <div>
      {isMobile() ? (
        <ButtonIcon iconProps={{ Component: IconNavigation }} onClick={() => onOpen?.(true)} />
      ) : null}

      <_SideNavigation
        {...args}
        logo={logoImg}
        isOpen={isOpen}
        logoClosed={logoClosedImg}
        onClose={onClose}
        onOpen={onOpen}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onPin={onPin}
        isPined={isPined}
      >
        <main className={'scrollbar scrollbar--vertical'}>
          <Block isOpen={isOpen} label="Finance">
            <>
              <NavigationItem
                As={() => (
                  <a href="/https://ameriabank.am">
                    <IconDocumentFilled />
                    <Text weight={'semibold'}>Accounts</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
                active
              />
              <NavigationItem
                As={() => (
                  <a href="/https://ameriabank.am">
                    <IconLockClosed />
                    <Text weight={'semibold'}>Test</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
                showAction={args.showAction}
              />
              <NavigationItem
                As={() => (
                  <a>
                    <IconHome />
                    <Text weight={'semibold'}>Cards</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
                expandable
                actionsList={[{ iconProps: IconAdd }, { iconProps: IconMore }]}
              >
                <>
                  <NavigationItem
                    As={() => (
                      <a href="/https://ameriabank.am">
                        <IconDocument />
                        <Text weight={'semibold'}>Accounts</Text>
                      </a>
                    )}
                    type={NavigationItemTypes.SUB}
                    isOpen={isNavigationItemOpen}
                  />
                  <NavigationItem
                    As={() => (
                      <a href="/https://ameriabank.am">
                        <IconSavings />
                        <Text weight={'semibold'}>Savings</Text>
                      </a>
                    )}
                    type={NavigationItemTypes.SUB}
                    isOpen={isNavigationItemOpen}
                  />
                  <NavigationItem
                    As={() => (
                      <a href="/https://ameriabank.am">
                        <IconWallet />
                        <Text weight={'semibold'}>Overdraft</Text>
                      </a>
                    )}
                    type={NavigationItemTypes.SUB}
                    isOpen={isNavigationItemOpen}
                  />
                </>
              </NavigationItem>
              <NavigationItem
                As={() => (
                  <a href="/https://ameriabank.am">
                    <IconSavings />
                    <Text weight={'semibold'}>Savings</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
                rightContent={<Badge type={'red'} size={'small'} text={'+999'} /> }
              />
            </>
          </Block>
          <Block isOpen={isOpen} label="Finance">
            <>
              <NavigationItem
                As={() => (
                  <a href="/https://ameriabank.am">
                    <IconWallet />
                    <Text weight={'semibold'}>Overdraft</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
              />
              <NavigationItem
                As={() => (
                  <a href="/https://ameriabank.am">
                    <IconHome />
                    <Text weight={'semibold'}>Mortgage</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
              />
              <NavigationItem
                As={() => (
                  <a href="/https://ameriabank.am">
                    <IconWallet />
                    <Text weight={'semibold'}>Overdraft</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
              />

              <NavigationItem
                As={() => (
                  <a href="/https://ameriabank.am">
                    <IconHome />
                    <Text weight={'semibold'}>Mortgage</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
              />
              <NavigationItem
                As={() => (
                  <a>
                    <IconSavings />
                    <Text weight={'semibold'}>Car Leon</Text>
                  </a>
                )}
                type={NavigationItemTypes.MAIN}
                isOpen={isNavigationItemOpen}
                expandable
                actionsList={[{ iconProps: IconAdd }, { iconProps: IconMore }]}
              >
                <>
                  <NavigationItem
                    As={() => (
                      <a href="/https://ameriabank.am">
                        <IconSavings />
                        <Text weight={'semibold'}>Savings</Text>
                      </a>
                    )}
                    type={NavigationItemTypes.SUB}
                    isOpen={isNavigationItemOpen}
                  />
                  <NavigationItem
                    As={() => (
                      <a href="/https://ameriabank.am">
                        <IconDocument />
                        <Text weight={'semibold'}>Accounts</Text>
                      </a>
                    )}
                    type={NavigationItemTypes.SUB}
                    isOpen={isNavigationItemOpen}
                  />
                </>
              </NavigationItem>
            </>
          </Block>
        </main>
        {/*<footer></footer>*/}
      </_SideNavigation>
    </div>
  )
}

export const SideNavigation = Template.bind({})

// @ts-ignore
SideNavigation.args = {}
