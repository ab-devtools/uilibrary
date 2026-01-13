import { useMemo } from 'react'
import { useGetElemSizes } from './useGetElemSizes'
import { useGetElemPositions } from './useGetElemPositions'
import { useGetTooltipPosition } from './useGetTooltipPosition'
import { Positions } from '../components/Tooltip/types'
import type { TTooltipPosition } from '../types/globalTypes'

const TOOLTIP_GAP = 8

type TReturn = {
  tooltipPosition: TTooltipPosition
  tooltipStyles: {
    top: number
    left: number
  }
}
export const useGetTooltipStyles = ({
  initialPosition,
  elemRef,
  tooltipRef,
  toolTipCurrentWidth
}: {
  initialPosition: TTooltipPosition
  elemRef: HTMLElement | null
  tooltipRef: HTMLElement | null
  toolTipCurrentWidth?: number
}): TReturn => {
  const { top, left, right } = useGetElemPositions(elemRef)

  const { width, height } = useGetElemSizes(elemRef)
  const { height: tooltipHeight, width: tooltipWitdh } = useGetElemSizes(tooltipRef)

  const TOOLTIP_WIDTH = toolTipCurrentWidth || tooltipWitdh

  const tooltipPosition = useGetTooltipPosition({ tooltipRef, elemRef, initialPosition })

  const tooltipStyles = useMemo(() => {
    if (tooltipPosition === Positions.BOTTOM_LEFT) {
      return { top: top + (height + TOOLTIP_GAP), left }
    }
    if (tooltipPosition === Positions.TOP_LEFT) {
      return { top: top - (tooltipHeight + TOOLTIP_GAP), left }
    }
    if (tooltipPosition === Positions.BOTTOM_RIGHT) {
      return {
        top: top + (height + TOOLTIP_GAP),
        left: right - TOOLTIP_WIDTH - TOOLTIP_GAP
      }
    }
    if (tooltipPosition === Positions.TOP_RIGHT) {
      return {
        top: top - tooltipHeight - TOOLTIP_GAP,
        left: right - TOOLTIP_WIDTH - TOOLTIP_GAP
      }
    }
    if (tooltipPosition === Positions.BOTTOM_CENTER) {
      return { top: top + (height + TOOLTIP_GAP), left: left - (TOOLTIP_WIDTH - width) / 2 }
    }
    if (tooltipPosition === Positions.TOP_CENTER) {
      return { top: top - (tooltipHeight + TOOLTIP_GAP), left: left - (TOOLTIP_WIDTH - width) / 2 }
    }
    if (tooltipPosition === Positions.MIDDLE_LEFT) {
      return { top: top + height / 2 - tooltipHeight / 2, left: left - TOOLTIP_WIDTH - TOOLTIP_GAP }
    }
    if (tooltipPosition === Positions.MIDDLE_RIGHT) {
      return { top: top + height / 2 - tooltipHeight / 2, left: left + width + TOOLTIP_GAP }
    }
    return { left, top }
  }, [top, left, width, height, tooltipPosition, TOOLTIP_WIDTH])

  return { tooltipStyles, tooltipPosition }
}
