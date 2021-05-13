import * as React from 'react'
import RcImage, { ImageProps } from 'rc-image'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import PreviewGroup, { icons } from './preview'
import './index.less'

export interface CompositionImage<P> extends React.FC<P> {
  PreviewGroup: typeof PreviewGroup
}

const Image: CompositionImage<ImageProps> = ({
  prefixCls: customizePrefixCls,
  preview,
  ...otherProps
}) => {

  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview
    }
    const _preview = typeof preview === 'object' ? preview : {}
    return {
      mask: <div className='kenshin-image-mask-info'>
        <EyeOutlined />
        预览
      </div>,
      icons,
      ..._preview,
      transitionName: _preview.transitionName || 'kenshin-zoom',
      maskTransitionName: _preview.maskTransitionName || 'kenshin-fade'
    }
  }, [preview])

  return <RcImage
    prefixCls={customizePrefixCls || 'kenshin-image'}
    preview={mergedPreview}
    {...otherProps}
  />
}

// export { ImageProps }

Image.PreviewGroup = PreviewGroup

export default Image
