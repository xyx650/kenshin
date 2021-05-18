import * as React from 'react'
import classnames from 'classnames'
import CollapseItem, { CollapseItemProps } from './collapse-item'
import './collapse.less'

export interface CollapseProps {
  accordion: boolean;
  value: string | string[];
  onChange?: (activeNames: string[]) => void;
  style?: React.CSSProperties;
  className?: string
}

export interface ComputedCollapse extends React.FC<CollapseProps> {
  Item: typeof CollapseItem
}


const Collapse: ComputedCollapse = props => {
  const { value } = props
  const [activeNames, setActiveNames] = React.useState(([] as string[]).concat(value))


  React.useEffect(() => {
    props.onChange?.(activeNames.slice(0))
  }, [activeNames])


  const handleItemClick = (name: string) => {
    // 手风琴模式 单个展开
    if (props.accordion) {
      setActiveNames(activeNames[0] && activeNames[0] === name ? [''] : [name])
      return
    }
    // 多个展开
    if (activeNames.includes(name)) {
      setActiveNames(activeNames.filter(item => item !== name))
    } else {
      setActiveNames(activeNames.concat(name))
    }
  }

  const content = React.Children.map(props.children, (child, key) => {

    const name = (child as React.ReactElement<CollapseItemProps>).props.name || key.toString()
    return React.cloneElement(child as React.ReactElement<CollapseItemProps>, {
      isActive: activeNames.includes(name),
      key,
      name,
      onClick: handleItemClick
    })
  })

  return <div className={classnames('kenshin-collapse', props.className)} style={props.style}>
    {content}
  </div>
}

Collapse.defaultProps = {
  value: [],
  onChange() {}
}

Collapse.Item = CollapseItem

export default Collapse
