import type { ReactElement } from 'react'
import React, { Children, useRef } from 'react'
import classnames from 'classnames'
import { ButtonIcon } from '../../ButtonIcon'
import IconArrowLeft from '../../SVGIcons/IconArrowLeft'
import IconArrowRight from '../../SVGIcons/IconArrowRight'
import { useScrollEdges } from '../hooks/useScrollEdges'
import type { TScrollableCarouselProps } from '../types'
import { DEFAULT_SCROLL_STEP } from '../consts'

export const ScrollableCarousel = ({
  children,
  className = '',
  scrollStep = DEFAULT_SCROLL_STEP,
  prevAriaLabel = 'Previous',
  nextAriaLabel = 'Next'
}: TScrollableCarouselProps): ReactElement => {
  const trackRef = useRef<HTMLDivElement>(null)
  const { canScrollLeft, canScrollRight, recompute } = useScrollEdges(
    trackRef,
    Children.count(children)
  )

  const scrollByStep = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * scrollStep, behavior: 'smooth' })
  }

  return (
    <div className={classnames('upload-carousel', className)}>
      <div ref={trackRef} className="upload-carousel__track" onScroll={recompute}>
        {children}
      </div>

      {canScrollLeft ? (
        <ButtonIcon
          size="medium"
          aria-label={prevAriaLabel}
          className="upload-carousel__arrow upload-carousel__arrow--prev"
          iconProps={{ Component: IconArrowLeft, type: 'primary' }}
          onClick={() => scrollByStep(-1)}
        />
      ) : null}

      {canScrollRight ? (
        <ButtonIcon
          size="medium"
          aria-label={nextAriaLabel}
          className="upload-carousel__arrow upload-carousel__arrow--next"
          iconProps={{ Component: IconArrowRight, type: 'primary' }}
          onClick={() => scrollByStep(1)}
        />
      ) : null}
    </div>
  )
}
