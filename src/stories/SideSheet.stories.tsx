import React, { useRef, useState } from 'react'
import {
  Button,
  Modal,
  SideSheet as _SideSheet,
  FormContainer,
  MultiSelect as _MultiSelect,
  IconEdit
} from '../index'
import * as yup from 'yup'
import IconMore from '../components/SVGIcons/IconMore'
import IconPerson from '../components/SVGIcons/IconPerson'
import IconInfo from '../components/SVGIcons/IconInfo'
import { StoryFn } from '@storybook/react'
import { TSideSheetPropTypes } from '../components/SideSheet/types'
import type {
  TClickEventType,
  TSelectedValue,
  TSelectGroupOptions,
  TSelectOptions
} from '../types/globalTypes'

export default {
  title: 'Side Sheet',
  component: _SideSheet,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    },
    position: {
      options: ['left', 'right', 'bottom'],
      control: { type: 'radio' }
    },
    isWithDivider: {
      options: [false, true],
      control: { type: 'radio' }
    }
  }
}

const VALIDATION_SCHEME = yup.object({
  test: yup.string().required('validation').nullable(),
  firstname: yup.string().required('validation').nullable()
})

const INITIAL_VALUES = {
  firstname: 5
}

const OPTIONS: TSelectOptions = [
  {
    value: 1,
    label:
      'Armeniaaasdasdasdasdlkashdkjlashdkjasdkjashkdjhaskjdhdaskjdhaskjhdkajsdkjasdkjashdjkashdkjhaskdhaskjdhaskjdhaskjdhaskjhdkjas',
    meta: 'AM'
  },
  {
    value: 2,
    label: 'Italy',
    meta: 'IT'
  },
  {
    value: 3,
    label: 'France    France    France',
    meta: 'FR'
  },
  {
    value: 4,
    label: 'Spain',
    meta: 'SP'
  },
  {
    value: 5,
    label: 'Germany',
    meta: 'De'
  },
  {
    value: 6,
    label: 'Australia',
    meta: 'AU'
  },
  {
    value: 7,
    label: 'Hungary',
    meta: 'HY'
  },
  {
    value: 8,
    label: 'Georgia',
    meta: 'GE'
  },
  {
    value: 9,
    label: 'Brazil',
    meta: 'BR'
  },
  {
    value: 10,
    label: 'Norway',
    meta: 'NR'
  },
  {
    value: 11,
    label: 'Mexico',
    meta: 'MC'
  }
]
const OPTIONS_CITIES: TSelectOptions = [
  {
    value: 'yerevan',
    label: 'Yerevan'
  },
  {
    value: 'rome',
    label: 'Rome'
  },
  {
    value: 'paris',
    label: 'Paris'
  },
  {
    value: 'aaaa',
    label: 'iiii'
  }
]

const OPTIONS_GROUPED: TSelectGroupOptions = [
  {
    title: 'Countries',
    data: OPTIONS
  },
  {
    title: 'Cities',
    data: OPTIONS_CITIES
  }
]

const Template: StoryFn<TSideSheetPropTypes> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenSheet = () => {
    setIsOpen(true)
  }
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [open, setOpen] = useState(false)

  const closeModal = () => setIsModalOpen(false)
  const onModalOutsideClick = () => {
    setIsModalOpen(false)
  }
  const openModal = () => setIsModalOpen(true)
  const _isDirtyRef = useRef<boolean>(false)

  const onModalSubmit = () => {
    setIsModalOpen(false)
    setIsOpen(false)
  }

  const closeSideSheet = (e: TClickEventType | undefined | MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (_isDirtyRef.current) {
      setIsModalOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  const onSubmit = (isChecked: boolean) => {
    console.log(isChecked)
    console.log('submit')
  }

  const [selectedValues, setSelectedValues] = useState<TSelectedValue[]>([])

  const set = (value: TSelectedValue[], isChecked: boolean) => {
    setSelectedValues(value)
  }

  return (
    <div className={'flexbox'} style={{ overflow: 'hidden' }}>
      <div style={{ flex: 1, border: '1px solid grey' }}>
        Lorem ipsum dolor sit amet consectetu
        <button onClick={handleOpenSheet}>Open Side Sheet</button>
      </div>
      <_SideSheet
        {...args}
        onClose={closeSideSheet}
        topLeftActions={
          <div>
            <Button type="tertiary" iconProps={{ Component: IconEdit }} />
          </div>
        }
        topRightActions={
          <div>
            <Button type="tertiary" iconProps={{ Component: IconEdit }} />
          </div>
        }
        isOpen={isOpen}
        shouldRemoveCallback={false}
        onSubmit={onSubmit}
        headerContent={<p>Lorem ipsum dolor sit amet consectetu </p>}
      >
        <>
          <div>
            <FormContainer
              onSubmit={(data) => console.log('data', data)}
              validationScheme={VALIDATION_SCHEME}
              initialValues={INITIAL_VALUES}
            >
              <Button
                buttonText={'show modal on outside click'}
                onClick={() => (_isDirtyRef.current = true)}
              />
              <div>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non?
                </span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non?
                </span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non?
                </span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non?
                </span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non?
                </span>
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Amet itaque vero sapiente rerum sed
                  tempore assumenda, illo mollitia perferendis eveniet unde facere officiis possimus
                  quidem fugiat animi? Possimus, cum non? Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Amet itaque vero sapiente rerum sed tempore assumenda, illo
                  mollitia perferendis eveniet unde facere officiis possimus quidem fugiat animi?
                  Possimus, cum non? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
                  itaque vero sapiente rerum sed tempore assumenda, illo mollitia perferendis
                  eveniet unde facere officiis possimus quidem fugiat animi? Possimus, cum non?
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Amet itaque vero sapiente rerum sed
                  tempore assumenda, illo mollitia perferendis eveniet unde facere officiis possimus
                  quidem fugiat animi? Possimus, cum non? Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Amet itaque vero sapiente rerum sed tempore assumenda, illo
                  mollitia perferendis eveniet unde facere officiis possimus quidem fugiat animi?
                  Possimus, cum non? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
                  itaque vero sapiente rerum sed tempore assumenda, illo mollitia perferendis
                  eveniet unde facere officiis possimus quidem fugiat animi? Possimus, cum non?
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet itaque vero
                  sapiente rerum sed tempore assumenda, illo mollitia perferendis eveniet unde
                  facere officiis possimus quidem fugiat animi? Possimus, cum non?
                </span>
              </div>
              <_MultiSelect
                isLoading={false}
                label="Select"
                options={OPTIONS_GROUPED}
                placeHolder="Select country"
                helperText="To be filled in only for USA, Canada and European countries."
                labelAddons={
                  <IconInfo size={'xsmall'} type={'information-light'} className={'ml-4'} />
                }
                isGrouped={true}
                isButtonSelect={true}
                dropdownWidth={400}
                align="right"
                maxSelectCount={3}
                selectedItems={selectedValues}
                setSelectedItems={set}
                labelRightIconComponent={() => (
                  <IconPerson
                    size="xsmall"
                    className="mr-4"
                    onClick={(e: any) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  />
                )}
                translations={{
                  innerLabel: 'Group name',
                  clearAllLabel: 'Clear All',
                  selectAllLabel: 'Select All',
                  emptyListMainMessage: ''
                }}
              />
            </FormContainer>
          </div>

          <div style={{ height: 2000 }}>
            <div style={{ position: 'relative', width: 'fit-content' }} ref={setRef}>
              <Button onClick={() => setOpen(!open)} iconProps={{ Component: IconMore }} />
            </div>
          </div>
        </>
      </_SideSheet>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={onModalSubmit}
        closeOnOutsideClick={false}
        buttonProps={{
          confirm: {
            buttonText: 'Register',
            buttonActionType: 'submit'
          },
          cancel: { buttonText: 'Cancel' }
        }}
      >
        content
      </Modal>
    </div>
  )
}

export const SideSheet = Template.bind({})

SideSheet.args = {
  title: 'Side sheet title',
  size: 'small',
  footerButtons: {
    confirm: {
      buttonText: 'Save'
    },
    cancel: { buttonText: 'Cancel' },
    extraButton: { buttonText: 'Other action' }
  },
  checkboxInfo: {
    label: 'Agree to terms',
    isChecked: false
  },
  tabItemsProps: {
    tabItems: [
      {
        label: 'tab 1',
        value: 'tab1'
      },
      {
        label: 'tab 2',
        value: 'tab2'
      }
    ],
    selectedValue: 'tab1',
    onSelect: (value) => 'tab1'
  },
  // position: 'left'
  withOverlay: false,
  isPositioned: false,
  isWithDivider: false
}
