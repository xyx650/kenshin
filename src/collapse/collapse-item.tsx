import * as React from 'react'
import classnames from 'classnames'
import CollapseTransition from './collapse-transition'
import './collapse-item.less'

export type CollapseItemProps = {
  onClick: (name: string) => void;
  isActive: boolean;
  title: React.ReactNode;
  name: string;
}

const CollapseItem: React.FC<CollapseItemProps> = props => {
  const { title, isActive, onClick, name } = props

  return <div className={classnames('kenshin-collapse-item', { 'is-active': isActive })}>
    <div className='kenshin-collapse-item__header' onClick={() => onClick(name)}>
      <i className='kenshin-collapse-item__header__arrow kenshin-icon-arrow-right' />
      {title}
    </div>
    <CollapseTransition isShow={isActive}>
      <div className="kenshin-collapse-item__wrap">
        <div className="kenshin-collapse-item__content">
          {props.children}
        </div>
      </div>
    </CollapseTransition>
  </div>
}

export default CollapseItem
