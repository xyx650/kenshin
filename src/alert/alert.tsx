import * as React from 'react'
import classnames from 'classnames'
import View from '../_base/view'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface AlertProps {
  /**
   * @description 关闭alert时触发的事件
   */
  onClose?: () => void;
  /**
   * @description 标题，必选参数
   */
  title: string;
  /**
   * @description 辅助性文字
   */
  description?: string;
  /**
   * @description 主题
   */
  type: 'success' | 'warning' | 'error' | 'info';
  /**
   * @description 是否可关闭
   */
  closable?: boolean;
  /**
   * @description 关闭按钮自定义文本
   */
  closeText?: string;
  /**
   * @description 是否显示图标
   */
  showIcon?: boolean;
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @description 自定义样式类
   */
  className?: string;
  /**
   * @description 自定义样式类前缀
   */
  prefixCls?: string;
}

const TYPE_CLASSES_MAP: Record<string, string> = {
  'success': `${prefix}-icon-circle-check`,
  'warning': `${prefix}-icon-warning`,
  'error': `${prefix}-icon-circle-cross`
}

const Alert: React.FC<AlertProps> = props => {

  const [visible, setVisible] = React.useState(true)
  const {
    type = 'info',
    closable = true,
    title,
    description,
    closeText,
    showIcon,
    onClose,
    prefixCls = prefix
  } = props

  // 关闭时触发 onClose
  React.useEffect(() => {
    if (!visible) {
      onClose?.()
    }
  }, [visible, onClose])

  const close = () => {
    setVisible(false)
  }


  return <View show={visible}>
    <div style={props.style} className={classnames(`${prefixCls}-alert`, `${prefixCls}-alert--${type}`)}>
      {
        showIcon &&
        <i className={classnames(
          `${prefixCls}-alert__icon`,
          TYPE_CLASSES_MAP[type] || `${prefixCls}-icon-information`,
          { 'is-big': description })}
        />
      }
      <div className={`${prefixCls}-alert__content`}>
        {title && <span className={classnames(`${prefixCls}-alert__title`, { 'is-bold': description })}>{title}</span>}
        {description && <p className={`${prefixCls}-alert__description`}>{description}</p>}
        <View show={closable}>
          <i
            className={classnames(`${prefixCls}-alert__closebtn`, closeText ? 'is-customed' : `${prefixCls}-icon-close`)}
            onClick={close}
          >{closeText}</i>
        </View>
      </div>
    </div>
  </View>
}


Alert.defaultProps = {
  type: 'info',
  closable: true
}

export default Alert
