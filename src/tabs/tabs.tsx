import * as React from 'react';
import RcTabs, { TabPane, TabsProps as RcTabsProps } from 'rc-tabs';
import { EditableConfig } from 'rc-tabs/lib/interface';
import classNames from 'classnames';
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import './tabs.less';

export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps extends Omit<RcTabsProps, 'editable'> {
  type?: TabsType;
  size?: string;
  hideAdd?: boolean;
  centered?: boolean;
  addIcon?: React.ReactNode;
  onEdit?: (e: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => void;
}

function Tabs({ type, className, size, onEdit, hideAdd, centered, addIcon, ...props }: TabsProps) {
  const { prefixCls: customizePrefixCls, moreIcon = <EllipsisOutlined /> } = props;
  const prefixCls = 'kenshin';

  let editable: EditableConfig | undefined;
  if (type === 'editable-card') {
    editable = {
      onEdit: (editType, { key, event }) => {
        onEdit?.(editType === 'add' ? event : key!, editType);
      },
      removeIcon: <CloseOutlined />,
      addIcon: addIcon || <PlusOutlined />,
      showAdd: hideAdd !== true,
    };
  }

  return (
    <RcTabs
      moreTransitionName={`tabs-slide-up`}
      {...props}
      className={classNames(
        'kenshin-tabs',
        {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-card`]: ['card', 'editable-card'].includes(type as string),
          [`${prefixCls}-editable-card`]: type === 'editable-card',
          [`${prefixCls}-centered`]: centered,
        },
        className,
      )}
      editable={editable}
      moreIcon={moreIcon}
      prefixCls={prefixCls}
    />
  );
}

Tabs.TabPane = TabPane;

export default Tabs;
