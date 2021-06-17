import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import RcMenu, { ItemGroup,Divider,MenuProps as RcMenuProps } from 'rc-menu';
import classNames from 'classnames';
import MenuIten from "./MenuItem"
import SubMenu from "./SubMenu"
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MenuContext,{MenuTheme} from "./MenuContext"
import { prefixCls as rootPrefixCls } from '../config';
import "./menu.less"

const prefixCls = `${rootPrefixCls}-menu`

export interface MenuProps extends RcMenuProps {
  theme: MenuTheme
}

// eslint-disable-next-line @typescript-eslint/ban-types
class Menu extends React.Component<MenuProps, {}>{
  static defaultProps: Partial<MenuProps> = {
    className: '',
  };

  static Item = MenuIten;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;
  static Divider = Divider;

  static displayName = "Menu";

  getInlineCollapsed() {
    const { inlineCollapsed, siderCollapsed } = this.props;
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }

  renderMenu(){
    const {className,theme,...props} = this.props;
    const menuClassName = classNames(
      `${prefixCls}-${theme}`,
      {
        [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
      },
      className,
    );
    return (
      <MenuContext.Provider
        value={{
          inlineCollapsed: this.getInlineCollapsed() || false,
          antdMenuTheme: theme,
        }}
      >
      <RcMenu
        className={menuClassName}
        prefixCls={prefixCls}
        {...props}
      />
      </MenuContext.Provider>
    );
  }

  render() {
    return this.renderMenu()
  }
}

export default Menu;
