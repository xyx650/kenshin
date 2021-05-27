import * as React from 'react'
import classnames from 'classnames'
import View from '@/_base/view'
import { dropdownContext } from '@/dropdown/context'
import Popper from 'popper.js'

const DropdownMenu: React.FC<{}> = props => {

  const [showPopper, setShowPopper] = React.useState(false)
  const popperRef = React.useRef<HTMLUListElement>(null)
  const { menuAlign, rootRef, prefixCls } = React.useContext(dropdownContext)
  const { children } = props
  const popperJs = React.useRef<null | Popper>(null)

  const placement = () => `bottom-${menuAlign}` as Popper.Placement

  const onVisibleChange = (visible: boolean) => {
    setShowPopper(visible)
  }

  const onEnter = () => {
    popperJs.current = new Popper(rootRef.current!, popperRef.current!, {
      placement: placement(),
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    })
  }

  const onAfterLeave = () => {
    popperJs.current!.destroy()
  }


  return <View show={showPopper}>
    <ul ref={popperRef} className={classnames(`${prefixCls}-dropdown-menu`)}>
      {children}
    </ul>
  </View>
}

export default DropdownMenu
