import { createContext } from 'react';

export type MenuTheme = 'light' | 'dark';
export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface MenuContextProps {
  inlineCollapsed: boolean;
  antdMenuTheme?: MenuTheme;
  direction?: DirectionType;
}

const MenuContext = createContext<MenuContextProps>({
  inlineCollapsed: false,
});

export default MenuContext;
