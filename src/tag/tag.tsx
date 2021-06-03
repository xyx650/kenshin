import * as React from 'react'
import classnames from 'classnames'
import View from '../_base/view'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface TagProps {
  // 是否可关闭
  closable?: boolean;
  // 主题
  type?: 'primary' | 'gray' | 'success' | 'warning' | 'danger';
  // 是否有边框描边
  hit?: boolean;
  color: string;
  // closeTransition: boolean,
  onClose?: () => void;

  prefixCls?: string;
}

const Tag: React.FC<TagProps> = props => {
  const { type, hit = false, closable = false, color, prefixCls = prefix } = props
  const [visible, setVisible] = React.useState(true)
  const [isHandled, setIsHandled] = React.useState(false)

  React.useEffect(() => {
    // handleClose callback
    if (!visible) {
      props.onClose?.()
    }
  }, [visible, isHandled])

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

export default Tag
