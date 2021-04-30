import * as React from 'react'
import classNames from 'classnames'
import './index.less'

export type DividerProps = {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
  plain?: boolean;
}

const Divider: React.FC<DividerProps> = props => {
  const {
    type = 'horizontal',
    orientation = 'center',
    className,
    children,
    ...restProps
  } = props

  const classString = classNames('kenshin-divider', `kenshin-divider--${type}`, className)

  return <div className={classString} {...restProps}>
    {children && <span className={classNames(`kenshin-divider__text`,`is-${orientation}`)}>{children}</span>}
  </div>
}

export default Divider
