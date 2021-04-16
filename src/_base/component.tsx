import * as React from 'react'
import classnames from 'classnames'

type BaseComponentType = {
  className?: string;
  style?: { [key: string]: string }
}

export default class Component<P = {}, S = {}> extends React.Component<P & BaseComponentType, S> {
  constructor(props: P) {
    super(props)
  }

  classNames(...args: string[] | { [key: string]: any }[]) {
    return classnames(args)
  }

  className(...args: string[]) {
    const { className } = this.props
    return this.classNames.apply(this, args.concat([className!]))
  }

  style(args: BaseComponentType['style'] = {}) {
    const { style } = this.props
    return Object.assign({}, args, style)
  }
}
