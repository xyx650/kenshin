import * as React from 'react'
import classnames, { Argument } from 'classnames'

export type BaseComponentType = {
  /**
   * @description       样式类
   */
  className?: string
  /**
   * @description       样式
   */
  style?: { [key: string]: string | undefined }
}

export default class Component<P = {}, S = {}> extends React.Component<P & BaseComponentType, S> {
  constructor(props: P) {
    super(props)
  }

  classNames(...args: Argument[]) {
    return classnames(args)
  }

  className(...args: Argument[]) {
    const { className } = this.props
    return this.classNames.apply(this, args.concat([className!]))
  }

  style(args: BaseComponentType['style'] = {}) {
    const { style } = this.props
    return Object.assign({}, args, style)
  }
}

export function classNames(...args: Argument[]) {
  return classnames(args)
}

export function className(this: React.Component<BaseComponentType>, ...args: Argument[]) {
  const { className } = this.props
  return classNames.apply(this, args.concat([className!]))
}

export function style(this: React.Component<BaseComponentType>, args: BaseComponentType['style'] = {}) {
  const { style } = this.props
  return Object.assign({}, args, style)
}
