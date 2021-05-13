import * as React from 'react'
import classnames from 'classnames'
import View from '@/_base/view'
import './index.less'

export type AlertProps = {
  onClose?: () => void,
  title: string,
  description?: string,
  type: 'success' | 'warning' | 'error' | 'info',
  closable?: boolean,
  closeText?: string,
  showIcon?: boolean
  style?: React.CSSProperties
  className?: string
}

const TYPE_CLASSES_MAP: { [type: string]: string } = {
  'success': 'kenshin-icon-circle-check',
  'warning': 'kenshin-icon-warning',
  'error': 'kenshin-icon-circle-cross'
}

const Alert: React.FC<AlertProps> = props => {

  const [visible, setVisible] = React.useState(true)
  const {
    type = 'info',
    closable = true,
    title,
    description,
    closeText,
    showIcon
  } = props

  // 关闭时触发 onClose
  React.useEffect(() => {
    if (!visible) {
      props.onClose?.()
    }
  }, [visible])

  const close = () => {
    setVisible(false)
  }


  return <View show={visible}>
    <div style={props.style} className={classnames('kenshin-alert', `kenshin-alert--${type}`)}>
      {
        showIcon &&
        <i className={classnames(
          'kenshin-alert__icon',
          TYPE_CLASSES_MAP[type] || 'kenshin-icon-information',
          { 'is-big': description })}
        />
      }
      <div className='kenshin-alert__content'>
        {title && <span className={classnames('kenshin-alert__title', { 'is-bold': description })}>{title}</span>}
        {description && <p className='kenshin-alert__description'>{description}</p>}
        <View show={closable}>
          <i
            className={classnames('kenshin-alert__closebtn', closeText ? 'is-customed' : 'kenshin-icon-close')}
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
