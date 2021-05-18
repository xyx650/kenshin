import * as React from 'react'
import classnames from 'classnames'
import './index.less'

export interface CardProps {
  header?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
}


const Card: React.FC<CardProps> = props => {
  const { header, bodyStyle, children } = props
  return <div style={props.style} className={classnames('kenshin-card', props.className)}>
    {header && <div className={classnames('kenshin-card__header')}>{header}</div>}
    <div className='kenshin-card__body' style={bodyStyle}>
      {children}
    </div>
  </div>
}


Card.defaultProps = {
  bodyStyle: { padding: '20px' }
}

export default Card
