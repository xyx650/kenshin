import * as React from 'react'

export type DragOptions = {
  start?: (event: MouseEvent) => void;
  drag: (event: MouseEvent) => void;
  end: (event: MouseEvent) => void
}
export type AlphaSliderState = {
  thumbLeft: number;
  thumbTop: number;
  background?: string | null
}
