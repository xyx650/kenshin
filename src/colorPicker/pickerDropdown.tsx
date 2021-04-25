import * as React from 'react'
import HueSlider from './HueSlider'
import View from '@/_base/view'
import AlphaSlider from '@/colorPicker/alphaSlider'
import SvPanel from '@/colorPicker/svPanel'
import Component from '@/_base/component'
import type { ColorType } from '@/colorPicker/types'

type PickerDropdownProps = {
  color: ColorType,
  showPicker: boolean;
  showAlpha: boolean;
  onPick: () => void;
  onClear: () => void;
  onChange?: (color: ColorType) => void
}
export const childContext = React.createContext({
  onChange(color: ColorType) {

  }
})
export default class PickerDropdown extends Component<PickerDropdownProps> {

  private hue = React.createRef<HueSlider>()
  private sl = React.createRef<SvPanel>()
  private alpha = React.createRef<AlphaSlider>()

  constructor(props: PickerDropdownProps) {
    super(props)
  }

  render() {
    const { color, showAlpha, onPick, onClear, showPicker } = this.props
    const currentColor = color.value
    return (
      <View show={showPicker}>
        <div className='kenshin-color-dropdown kenshin-color-picker__panel'>
          <div className='kenshin-color-dropdown__main-wrapper'>
            <HueSlider color={color} vertical onChange={(color: ColorType) => {this.props.onChange!(color)}} ref={this.hue} />
            <SvPanel color={color} onChange={(color: ColorType) => this.props.onChange!(color)} ref={this.sl} />
          </div>
          {showAlpha && <AlphaSlider ref={this.alpha} color={color} />}
          <div className='kenshin-color-dropdown__btns'>
            <span className='kenshin-color-dropdown__value'>{currentColor}</span>
            <a
              href='JavaScript:'
              className='kenshin-color-dropdown__link-btn'
              onClick={() => onClear()}
            >清空</a>
            <button
              className='kenshin-color-dropdown__btn'
              onClick={() => onPick()}
            >确定</button>
          </div>
        </div>
      </View>
    )
  }
}
