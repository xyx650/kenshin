import * as React from 'react'

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  csp?: CSPConfig;
}
export interface CSPConfig {
  nonce?: string;
}
const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls
  return suffixCls ? `kenshin-${suffixCls}` : 'kenshin'
}

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
})

export const ConfigConsumer = ConfigContext.Consumer