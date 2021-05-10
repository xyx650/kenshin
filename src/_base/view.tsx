import * as React from 'react'
import classnames from 'classnames'
import Component from '@/_base/component'

export type ViewProps = {
  show: boolean
  onMouseEnter?: () => void
  className?: string
}

const View: React.FC<ViewProps> = props => {
  const { show = true, className = '', children } = props
  const mixed = { style: { ...(children as React.ReactElement).props.style } }
  if (!show) {
    mixed.style.display = 'none'
  }
  const classNames = []
  if ((children as React.ReactElement).props.className) {
    classNames.push((children as React.ReactElement).props.className)
  }
  if (className) {
    classNames.push(className)
  }
  const cls = {
    ...mixed,
    className: classNames.join(' ')
  }
  return React.cloneElement(React.Children.only(children as React.ReactElement), cls)
}

export default View

// export default class View extends Component<ViewProps> {
//   onMouseEnter() {
//     this.props.onMouseEnter?.()
//   }
//
//   render() {
//     const classNames = []
//     const { show = true, className = '', children } = this.props
//     const mixed = { style: { ...(children as React.ReactElement).props.style } }
//     if (!show) mixed.style.display = 'none'
//     if ((children as React.ReactElement).props.className) classNames.push((children as React.ReactElement).props.className)
//     if (className) classNames.push(className)
//     const cls = {
//       ...mixed,
//       className: classNames.join(' ')
//     }
//     return React.cloneElement(React.Children.only(children as React.ReactElement), cls)
//   }
// }




