import * as React from 'react'
import Component from '@/_base/component'
import './index.less'

export type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  type: string
  size: string,
  icon?: string,
  nativeType: 'button' | 'submit' | 'reset'
  loading: boolean
  disabled: boolean
  plain: boolean

}

export default class Button extends Component<ButtonProps> {
  static defaultProps = {
    type: 'default',
    nativeType: 'button',
    loading: false,
    disabled: false,
    plain: false
  }

  onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!this.props.loading) {
      this.props.onClick?.(e)
    }
  }

  render() {
    return (
      <button
        style={this.style()}
        className={
          this.className(
            'kenshin-button',
            this.props.type && `kenshin-button--${this.props.type}`,
            this.props.size && `kenshin-button--${this.props.size}`,
            {
              'is-disabled': this.props.disabled,
              'is-loading': this.props.loading,
              'is-plain': this.props.plain
            }
          )}
        disabled={this.props.disabled}
        type={this.props.nativeType}
        onClick={e => this.onClick(e)}
      >
        {this.props.loading && <i className='kenshin-icon-loading' />}
        {this.props.icon && !this.props.loading && <i className={`kenshin-icon-${this.props.icon}`} />}
        <span>{this.props.children}</span>
      </button>
    )
  }
}
