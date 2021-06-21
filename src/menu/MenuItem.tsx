import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MenuItemProps as RcMenuItemProps, Item } from 'rc-menu';
import toArray from 'rc-util/lib/Children/toArray';
import classNames from 'classnames';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Tooltip, { TooltipProps } from '../tooltip';
import { isValidElement, cloneElement } from '../_util/reactNode';
import { prefixCls as rootPrefixCls } from '../config';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MenuContext, { MenuContextProps } from './MenuContext';

const prefixCls = `${rootPrefixCls}-menu`

export interface SiderContextProps {
  siderCollapsed?: boolean;
  collapsedWidth?: number | string;
}

export const SiderContext: React.Context<SiderContextProps> = React.createContext({});

export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
  icon?: React.ReactNode;
  danger?: boolean;
  title?: React.ReactNode;
}

export default class MenuItem extends React.Component<MenuItemProps> {
  static isMenuItem = true;

  renderItemChildren(inlineCollapsed: boolean) {
    const { icon, children, level } = this.props;
    if (!icon || (isValidElement(children) && children.type === 'span')) {
      if (children && inlineCollapsed && level === 1 && typeof children === 'string') {
        return (
          <div className={`${prefixCls}-inline-collapsed-noicon`}>{children.charAt(0)}</div>
        );
      }
      return children;
    }
    return <span className={`${prefixCls}-title-content`}>{children}</span>;
  }

  renderItem = () => {
    const { level, className, children } = this.props;
    const { title, icon, danger, ...rest } = this.props;

    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed, direction }: MenuContextProps) => {
          let tooltipTitle = title;
          if (typeof title === 'undefined') {
            tooltipTitle = level === 1 ? children : '';
          } else if (title === false) {
            tooltipTitle = '';
          }
          const tooltipProps: TooltipProps = {
            title: tooltipTitle,
          };

          if (!inlineCollapsed) {
            tooltipProps.title = null;
            tooltipProps.visible = false;
          }
          const childrenLength = toArray(children).length;
          return (
            <Tooltip
              {...tooltipProps}
              placement={direction === 'rtl' ? 'left' : 'right'}
              overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
            >
              <Item
                {...rest}
                className={classNames(
                  {
                    [`${prefixCls}-item-danger`]: danger,
                    [`${prefixCls}-item-only-child`]:
                      (icon ? childrenLength + 1 : childrenLength) === 1,
                  },
                  className,
                )}
              >
                {cloneElement(icon, {
                  className: classNames(
                    isValidElement(icon) ? icon.props?.className : '',
                    `${prefixCls}-item-icon`,
                  ),
                })}
                {this.renderItemChildren(inlineCollapsed)}
              </Item>
            </Tooltip>
          );
        }}
      </MenuContext.Consumer>
    );
  };

  render() {
    return <SiderContext.Consumer>{this.renderItem}</SiderContext.Consumer>;
  }
}
