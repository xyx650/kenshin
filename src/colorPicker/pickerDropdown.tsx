import * as React from 'react'
import HueSlider from './HueSlider'
import View from '@/_base/view'
import AlphaSlider from '@/colorPicker/alphaSlider'
import Component from '@/_base/component'

type PickerDropdownProps = {
  color: { value: string },
  showPicker: boolean;
  showAlpha: boolean;
  onPick: () => void;
  onClear: () => void;
  onChange: () => void
}

export default class PickerDropdown extends Component<PickerDropdownProps> {
  constructor(props: PickerDropdownProps) {
    super(props)
  }
}
