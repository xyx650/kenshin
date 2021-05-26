import * as React from 'react'
import classnames from 'classnames'
import CollapseTransition from './collapse-transition'
import { prefixCls as prefix } from '@/config'
import './collapse-item.less'

export type CollapseItemProps = {
  onClick: (name: string) => void;
  isActive: boolean;
  title: React.ReactNode;
  name: string;
}

const CollapseItem: React.FC<CollapseItemProps> = props => {
  const { title, isActive, onClick, name } = props

  return <div className={classnames(`${prefix}-collapse-item`, { 'is-active': isActive })}>
    <div className={`${prefix}-collapse-item__header`} onClick={() => onClick(name)}>
      <i className={`${prefix}-collapse-item__header__arrow ${prefix}-icon-arrow-right`} />
      {title}
    </div>
    <CollapseTransition isShow={isActive}>
      <div className={`${prefix}-collapse-item__wrap`}>
        <div className={`${prefix}-collapse-item__content`}>
          {props.children}
        </div>
      </div>
    </CollapseTransition>
  </div>
}

export default CollapseItem
