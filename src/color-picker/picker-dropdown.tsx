import * as React from 'react'
import HueSlider from './hue-slider'
import View from '@/_base/view'
import AlphaSlider from './alpha-slider'
import SvPanel from './sv-panel'
import type { ColorType } from '@/color-picker/types'
import { colorPickerContext } from '@/color-picker/context'
import { prefixCls as prefix } from '@/config'
import classnames from 'classnames'

type PickerDropdownProps = {
  color: ColorType,
  showPicker: boolean;
  showAlpha: boolean;
  onPick: () => void;
  onClear: () => void;
  onChange: (color: string | null) => void
}

const PickerDropdown: React.FC<PickerDropdownProps> = (props) => {

  const { showPicker, color, showAlpha, onClear, onPick } = props

  const currentColor = color.value

  const { onChange } = React.useContext(colorPickerContext)


  return <View show={showPicker}>
    <div className={classnames(`${prefix}-color-dropdown`, `${prefix}n-color-picker__panel`)}>
      <div className={`${prefix}-color-dropdown__main-wrapper`}>
        <HueSlider
          color={color}
          vertical
          onChange={onChange}
        />
        <SvPanel color={color} onChange={onChange} />
      </div>
      {showAlpha && <AlphaSlider color={color} />}
      <div className={`${prefix}-color-dropdown__btns`}>
        <span className={`${prefix}-color-dropdown__value`}>{currentColor}</span>
        <span
          className={`${prefix}-color-dropdown__link-btn`}
          onClick={() => onClear()}
        >清空</span>
        <button
          className={`${prefix}-color-dropdown__btn`}
          onClick={() => onPick()}
        >确定
        </button>
      </div>
    </div>
  </View>
}
PickerDropdown.defaultProps = {
  onChange(color: string | null) {},
  onPick() {},
  onClear() {}
}

export default PickerDropdown
