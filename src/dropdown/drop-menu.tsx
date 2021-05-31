import * as React from 'react'
import classnames from 'classnames'
import View from '@/_base/view'
import { dropdownContext } from '@/dropdown/context'
import Popper from 'popper.js'
import { CSSTransition,Transition } from 'react-transition-group'
import './index.less'

export interface DropdownMenuProps {
  style?: React.CSSProperties
}

const DropdownMenuFC: React.ForwardRefRenderFunction<unknown, DropdownMenuProps> = (props, ref) => {

  const [showPopper, setShowPopper] = React.useState(false)
  const popperRef = ref as any || React.createRef()
  const { menuAlign, rootRef, prefixCls } = React.useContext(dropdownContext)
  const { children } = props
  const popperJs = React.useRef<null | Popper>(null)

  const placement = () => `bottom-${menuAlign}` as Popper.Placement

  React.useImperativeHandle(ref, () => {
    return {
      // @ts-ignore
      dom: ref?.current,
      onVisibleChange
    }
  })

  const onVisibleChange = (visible: boolean) => setShowPopper(visible)

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

  const onExited = () => {
    popperJs.current!.destroy()
  }
  // <Transition onEnter={onEnter} onExited={onExited} classNames={`${prefixCls}-zoom-in-top`} timeout={100} unmountOnExit >

  return <View show={showPopper}>
      <ul ref={popperRef} className={classnames(`${prefixCls}-dropdown-menu`)} style={props.style}>
        {children}
      </ul>
    </View>

}

const DropdownMenu = React.forwardRef(DropdownMenuFC)

export default DropdownMenu
