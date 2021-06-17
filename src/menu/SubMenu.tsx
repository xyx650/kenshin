import * as React from 'react';
import { SubMenu as RcSubMenu } from 'rc-menu';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MenuContext, { MenuContextProps } from './MenuContext';
import { isValidElement } from '../_util/reactNode';
import { prefixCls as rootPrefixCls } from '../config';

interface TitleEventEntity {
  key: string;
  domEvent: Event;
}

const prefixCls = `${rootPrefixCls}-menu`

export interface SubMenuProps {
  className?: string;
  disabled?: boolean;
  level?: number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onTitleClick?: (e: TitleEventEntity) => void;
  onTitleMouseEnter?: (e: TitleEventEntity) => void;
  onTitleMouseLeave?: (e: TitleEventEntity) => void;
  popupOffset?: [number, number];
  popupClassName?: string;
}

class SubMenu extends React.Component<SubMenuProps, any> {
  static contextType = MenuContext;

  static isSubMenu = 1;

  renderTitle(inlineCollapsed: boolean) {
    const { icon, title, level } = this.props;
    if (!icon) {
      return inlineCollapsed && level === 1 && title && typeof title === 'string' ? (
        <div className={`${prefixCls}-inline-collapsed-noicon`}>{title.charAt(0)}</div>
      ) : (
        title
      );
    }
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    const titleIsSpan = isValidElement(title) && title.type === 'span';
    return (
      <>
        {icon}
        {titleIsSpan ? title : <span  className={`${prefixCls}-title-content`} >{title}</span>}
      </>
    );
  }

  render() {
    const { popupClassName } = this.props;
    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed, antdMenuTheme }: MenuContextProps) => (
          <RcSubMenu
            {...omit(this.props, ['icon'])}
            title={this.renderTitle(inlineCollapsed)}
            popupClassName={classNames(
              prefixCls,
              `${prefixCls}-${antdMenuTheme}`,
              popupClassName,
            )}
          />
        )}
      </MenuContext.Consumer>
    );
  }
}

export default SubMenu;
