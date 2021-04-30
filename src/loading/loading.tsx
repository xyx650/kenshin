import * as React from 'react'
import classnames from 'classnames'
import './index.less'

export type LoadingProps = {
  /**
   * @description       loading 状态
   */
  loading: boolean
  /**
   * @description       是否全屏
   */
  fullscreen?: boolean
  /**
   * @description       加载文案
   */
  text?: string
  /**
   * @description       自定义样式
   */
  style?: React.CSSProperties
  /**
   * @description       自定义样式类
   */
  className?: string
}


const Loading: React.FC<LoadingProps> = props => {
  const {
    loading,
    fullscreen,
    text
  } = props

  // 更新全屏锁定属性
  React.useEffect(() => {
    fullscreen ? document.body.style.setProperty('overflow', 'hidden') : document.body.style.removeProperty('overflow')
  })

  // loading 内置样式
  const outerStyle: React.CSSProperties = fullscreen ? {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 99999
  } : loading ? { position: 'relative' } : {}


  const loadingStyle: React.CSSProperties = {
    display: 'block',
    position: 'absolute',
    zIndex: 657,
    backgroundColor: 'rgba(255, 255, 255, .9)',
    margin: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  const loadingInnerStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'inline-block',
    left: 0
  }

  return <div style={{ ...outerStyle, ...props.style }} className={classnames(props.className)}>
    {
      loading && <div style={loadingStyle}>
        <div
          className={classnames('kenshin-loading-spinner', { 'is-full-screen': fullscreen })}
          style={loadingInnerStyle}
        >
          <svg className='circular' viewBox='25 25 50 50'>
            <circle className='path' cx='50' cy='50' r='20' fill='none' />
          </svg>
          {text && <p className='kenshin-loading-text'>{text}</p>}
        </div>
      </div>
    }
    {props.children}
  </div>
}
Loading.defaultProps = {
  fullscreen: false
}
export default Loading
