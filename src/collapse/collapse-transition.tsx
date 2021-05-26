import * as React from 'react'
import './collapse-transition.less'

export type CollapseTransitionProps = {
  isShow: boolean,
}

// 过渡时间
const ANIMATION_DURATION = 300

const CollapseTransition: React.FC<CollapseTransitionProps> = props => {

  const selfRef = React.useRef<HTMLDivElement>(null)
  let leaveTimer: number
  let enterTimer: number

  // didMount and will Unmount
  React.useLayoutEffect(() => {
    beforeEnter()
    props.isShow && enter()
    return () => {
      beforeLeave()
      leave()
    }
  }, [])

  // when props.isShow change
  React.useEffect(() => {
    triggerChange(props.isShow)
  }, [props.isShow])


  const beforeEnter = () => {
    const el = selfRef.current!

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow
    el.style.height = '0'
    el.style.paddingTop = '0'
    el.style.paddingBottom = '0'
  }

  const enter = () => {
    const el = selfRef.current!

    el.style.display = 'block'
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight  }px`
      el.style.paddingTop = el.dataset.oldPaddingTop!
      el.style.paddingBottom = el.dataset.oldPaddingBottom!
    } else {
      el.style.height = ''
      el.style.paddingTop = el.dataset.oldPaddingTop!
      el.style.paddingBottom = el.dataset.oldPaddingBottom!
    }

    el.style.overflow = 'hidden'

    enterTimer = window.setTimeout(() => afterEnter(), ANIMATION_DURATION)
  }

  const afterEnter = () => {
    const el = selfRef.current!
    el.style.display = 'block'
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow!
  }

  const beforeLeave = () => {
    const el = selfRef.current!

    el.dataset.oldPaddingTop = el.style.paddingTop
    el.dataset.oldPaddingBottom = el.style.paddingBottom
    el.dataset.oldOverflow = el.style.overflow

    el.style.display = 'block'
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight  }px`
    }
    el.style.overflow = 'hidden'
  }

  const leave = () => {
    const el = selfRef.current!
    if (el.scrollHeight !== 0) {
      el.style.height = '0'
      el.style.paddingTop = '0'
      el.style.paddingBottom = '0'
    }
    leaveTimer = window.setTimeout(() => afterLeave(), ANIMATION_DURATION)
  }

  const afterLeave = () => {
    const el = selfRef.current
    if (!el) return
    el.style.display = 'none'
    el.style.height = ''
    el.style.overflow = el.dataset.oldOverflow!
    el.style.paddingTop = el.dataset.oldPaddingTop!
    el.style.paddingBottom = el.dataset.oldPaddingBottom!
  }

  const triggerChange = (isShow: boolean) => {
    clearTimeout(enterTimer)
    clearTimeout(leaveTimer)
    if (isShow) {
      beforeEnter()
      enter()
    } else {
      beforeLeave()
      leave()
    }
  }


  return <div
    className='collapse-transition'
    style={{ overflow: 'hidden' }}
    ref={selfRef}
  >
    {props.children}
  </div>
}

export default CollapseTransition
