import { JSX } from 'solid-js'

type TooltipPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'

type TooltipSize = 'small' | 'medium' | 'large' | 'fit'

type Role = JSX.ButtonHTMLAttributes<HTMLButtonElement>['role']

export interface Tooltip {
  'aria-label': string
  'data-microtip-size': TooltipSize
  'data-microtip-position': TooltipPosition
  role: Role
}

interface TooltipProps {
  label: string
  size?: TooltipSize
  position?: TooltipPosition
}

export function tooltip({
  label,
  position = 'bottom',
  size = 'large'
}: TooltipProps): Tooltip {
  return {
    'aria-label': label,
    'data-microtip-size': size,
    'data-microtip-position': position,
    role: 'tooltip'
  }
}
