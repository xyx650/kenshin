import * as React from 'react'
import type { ImageProps } from 'rc-image'
import RcImage from 'rc-image'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import PreviewGroup, { icons } from './preview'
import { prefixCls as prefix } from '../config'
import './index.less'

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup
}

const Image: CompositionImage<ImageProps> = ({
  prefixCls: customizePrefixCls = prefix,
  preview,
  ...otherProps
}) => {

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview
    }
    const _preview = typeof preview === 'object' ? preview : {}
    return {
      mask: <div className={`${customizePrefixCls}-image-mask-info`}>
        <EyeOutlined />
        预览
      </div>,
      icons,
      ..._preview,
      transitionName: _preview.transitionName || `${customizePrefixCls}-zoom`,
      maskTransitionName: _preview.maskTransitionName || `${customizePrefixCls}-fade`
    }
  }, [preview])

  return <RcImage
    prefixCls={`${customizePrefixCls}-image`}
    preview={mergedPreview}
    {...otherProps}
  />
}

// export { ImageProps }

Image.PreviewGroup = PreviewGroup

export default Image
