import * as React from 'react'
import RcImage from 'rc-image'
import { GroupConsumerProps } from 'rc-image/lib/PreviewGroup'
import RotateLeftOutlined from '@ant-design/icons/RotateLeftOutlined'
import RotateRightOutlined from '@ant-design/icons/RotateRightOutlined'
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined'
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined'
import LeftOutlined from '@ant-design/icons/LeftOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'

export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />
}

const PreviewGroup: React.FC<GroupConsumerProps> = ({
  previewPrefixCls: customizePrefixCls,
  preview,
  ...props
}) => {


  const mergedPreview = React.useMemo(() => {
    if (preview === false) {
      return preview
    }
    const _preview = typeof preview === 'object' ? preview : {}
    return {
      ..._preview,
      transitionName: _preview.transitionName || 'kenshin-zoom',
      maskTransitionName: _preview.maskTransitionName || 'kenshin-fade'
    }
  }, [preview])

  return <RcImage.PreviewGroup
    preview={mergedPreview}
    previewPrefixCls={customizePrefixCls || 'kenshin-image-preview'}
    icons={icons}
    {...props}
  />
}

export default PreviewGroup

