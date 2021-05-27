import React from 'react'

interface Context {
  handleMenuItemClick: (command: string) => void;
  prefixCls: string;
  menuAlign: string;
  rootRef: React.RefObject<HTMLDivElement>
}

export const dropdownContext = React.createContext<Context>({} as Context)
