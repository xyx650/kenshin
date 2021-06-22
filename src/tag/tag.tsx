import * as React from 'react'
import classnames from 'classnames'
import View from '../_base/view'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface TagProps {
  /**
   * @description 是否可关闭
   * @default false
   */
  closable?: boolean;
  /**
   * @description 主题
   * @default ''
   */
  type?: 'primary' | 'gray' | 'success' | 'warning' | 'danger';
  /**
   * @description 是否有边框描边
   * @default false
   */
  hit?: boolean;
  /**
   * @description 背景色
   */
  color?: string;
  // closeTransition: boolean,
  /**
   * @description 关闭事件
   */
  onClose?: () => void;
  /**
   * @description 自定义样式类名
   */
  className?: string;
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @description 自定义样式类前缀
   */
  prefixCls?: string;
}

const Tag: React.FC<TagProps> = props => {

  const {
    type,
    hit = false,
    closable = false,
    color,
    prefixCls = prefix,
    onClose

  } = props

  const [visible, setVisible] = React.useState(true)
  const [isHandled, setIsHandled] = React.useState(false)

  React.useEffect(() => {
    // handleClose callback
    if (!visible) {
      onClose?.()
    }
  }, [visible, isHandled, onClose])

  const handleClose = () => {
    setVisible(false)
    setIsHandled(true)
  }
  return <View show={visible}>
    <span style={{ backgroundColor: color }} className={classnames(`${prefixCls}-tag`,
      type && `${prefixCls}-tag--${type}`,
      { 'is-hit': hit })
    }>
      {props.children}
      {closable && <i className={`${prefixCls}-tag__close ${prefixCls}-icon-close`} onClick={() => handleClose()} />}
    </span>
  </View>
}

Tag.displayName = 'Tag'

Tag.defaultProps = {
  closable: false,
  hit: false
}

export default Tag
