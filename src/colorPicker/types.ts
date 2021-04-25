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

export type SvPanelState = {
  cursorTop: number;
  cursorLeft: number;
  background: string
}

export type ColorType = {
  _hue: number,
  _saturation: number,
  _value: number,
  _alpha: number | string,
  enableAlpha: boolean,
  format: string,
  value: string | number,
  set: (props: string | { [key: string]: string }, value?: string | number) => void,
  get: (props: string) => string | number,
  toRgb: () => { r: number, g: number, b: number },
  fromString: (value: string) => void,
  doOnChange: () => void
}
