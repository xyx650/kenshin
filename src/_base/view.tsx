import * as React from 'react'
import Component from '@/_base/component'

export type ViewProps = {
  show: boolean
}

export default class View extends Component<ViewProps> {
  render() {
    const classNames = []
    const { show = true, className = '', children } = this.props
    const mixed = { style: { ...(children as React.ReactElement).props.style } }
    if (!show) mixed.style.display = 'none'
    if ((children as React.ReactElement).props.className) classNames.push((children as React.ReactElement).props.className)
    if (className) classNames.push(className)
    const cls = {
      ...mixed,
      className: classNames.join(' ')
    }
    return React.cloneElement(React.Children.only(children as React.ReactElement), cls)
  }
}




