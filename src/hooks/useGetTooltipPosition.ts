import { useMemo } from 'react'
import { useGetElemPositions } from './useGetElemPositions'
import { useGetElemSizes } from './useGetElemSizes'
import type { TTooltipInfo, TTooltipPosition } from '../types/globalTypes'

const GAP = 20
const ARROW_DISTANCE = 20

export const useGetTooltipPosition = (info: TTooltipInfo): TTooltipPosition => {
  const { initialPosition, elemRef, tooltipRef, hasTriangle = true } = info

  const { left, top, bottom } = useGetElemPositions(elemRef)
  const { width: tooltipWidth, height: tooltipHeight } = useGetElemSizes(tooltipRef)
  const { width: itemWidth } = useGetElemSizes(elemRef)

  // this is calculations for tooltip top/left/bottom/right positions
  const calculatedPosition = useMemo(() => {
    const hasTopSpace = tooltipHeight + GAP < top

    const hasBottomSpace = tooltipHeight + GAP < window.innerHeight - bottom

    const hasLeftSpace = tooltipWidth + GAP < left
    const hasRightSpace = tooltipWidth + GAP < window.innerWidth - left
    const hasMiddleRightSpace = tooltipWidth + GAP < window.innerWidth - left - itemWidth

    if (!hasBottomSpace && !hasRightSpace && initialPosition.includes('bottom-right')) {
      return initialPosition.replace('bottom-right', 'top-left')
    }
    if (!hasTopSpace && initialPosition.includes('top')) {
      return initialPosition.replace('top', 'bottom')
    }
    if (!hasBottomSpace && initialPosition.includes('bottom')) {
      return initialPosition.replace('bottom', 'top')
    }
    if (!hasLeftSpace && initialPosition.includes('left')) {
      return initialPosition.replace('left', 'right')
    }
    if (!hasRightSpace && initialPosition.includes('right')) {
      return initialPosition.replace('right', 'left')
    }
    if (!hasMiddleRightSpace && initialPosition.includes('middle-right')) {
      return initialPosition.replace('right', 'left')
    }

    return initialPosition
  }, [tooltipHeight, tooltipWidth, bottom, initialPosition])

  // this is calculations for triangle position
  const finalPosition = useMemo(() => {
    const hasLeftSpace = tooltipWidth < left + ARROW_DISTANCE + GAP
    const hasRightSpace = tooltipWidth + GAP < window.innerWidth - left

    // in case of middle position we don't need to change triangle position
    if (calculatedPosition.includes('middle')) {
      return calculatedPosition
    }

    if (calculatedPosition.includes('right') && !hasLeftSpace) {
      return calculatedPosition.replace('right', 'left')
    }
    if (calculatedPosition.includes('left') && !hasRightSpace) {
      return calculatedPosition.replace('left', 'right')
    }

    if (calculatedPosition.includes('center')) {
      const hasLeftHalfSpace = tooltipWidth / 2 < left + ARROW_DISTANCE + GAP
      const hasRightHalfSpace = tooltipWidth / 2 + GAP < window.innerWidth - left
      if (!hasLeftHalfSpace) {
        return calculatedPosition.replace('center', 'left')
      }
      if (!hasRightHalfSpace) {
        return calculatedPosition.replace('center', 'right')
      }
      return calculatedPosition
    }
    return calculatedPosition
  }, [calculatedPosition, tooltipWidth, itemWidth, left])
  if (!hasTriangle) {
    return calculatedPosition as TTooltipPosition
  }
  return finalPosition as TTooltipPosition
}
