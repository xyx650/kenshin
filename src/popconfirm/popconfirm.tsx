import * as React from 'react'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import KeyCode from 'rc-util/lib/KeyCode'
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled'
import Button from '../button'
import type { AbstractTooltipProps } from '../tooltip';
import Tooltip from '../tooltip'
import classnames from 'classnames'
import { cloneElement } from '../_util/reactNode'
import './index.less'


type RenderFunction = () => React.ReactNode;

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  disabled?: boolean;
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  // okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  // okButtonProps?: NativeButtonProps;
  // cancelButtonProps?: NativeButtonProps;
  icon?: React.ReactNode;
  onVisibleChange?: (visible: boolean, e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface PopconfirmState {
  visible?: boolean;
}

const Popconfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible
  })

  const settingVisible = (value: boolean, e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => {
    setVisible(value)
    props.onVisibleChange?.(value, e)
  }

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e)
    props.onConfirm?.call(this, e)
  }

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e)
    props.onCancel?.call(this, e)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC && visible) {
      settingVisible(false, e)
    }
  }

  const onVisibleChange = (value: boolean) => {
    const { disabled } = props
    if (disabled) {
      return
    }
    settingVisible(value)
  }

  const getRenderPropValue = (propValue?: React.ReactNode | RenderFunction): React.ReactNode => {
    if (!propValue) {
      return null
    }

    if (typeof propValue === 'function') {
      return (propValue as RenderFunction)()
    }

    return propValue
  }

  const renderOverlay = (prefixCls: string) => {
    const {
      // okButtonProps,
      // cancelButtonProps,
      title,
      cancelText,
      okText,
      // okType,
      icon
    } = props
    return <div className={`${prefixCls}-inner-content`}>
      <div className={`${prefixCls}-message`}>
        {icon}
        <div className={`${prefixCls}-message-title`}>{getRenderPropValue(title)}</div>
      </div>
      <div className={`${prefixCls}-buttons`}>
        <Button
          onClick={onCancel}
          size='small'
        >
          {cancelText || '取消'}
        </Button>
        <Button
          onClick={onConfirm}
          size='small'
          type='primary'
        >
          {okText || '确定'}
        </Button>
      </div>
    </div>
  }

  const {
    prefixCls: customizePrefixCls,
    placement,
    children,
    overlayClassName,
    ...restProps
  } = props

  const prefixCls = 'kenshin-popover'
  const prefixClsConfirm = customizePrefixCls || 'kenshin-popconfirm'
  const overlayClassNames = classnames(prefixClsConfirm, overlayClassName)

  const overlay = renderOverlay(prefixCls)

  return <Tooltip
    {...restProps}
    prefixCls={prefixCls}
    placement={placement}
    onVisibleChange={onVisibleChange}
    visible={visible}
    overlay={overlay}
    overlayClassName={overlayClassNames}
    ref={ref}
    transitionName={props.transitionName || 'kenshin-zoom-big'}
  >
    {cloneElement(children, {
      onKeyDown: (e: React.KeyboardEvent<any>) => {
        if (React.isValidElement(children)) {
          children?.props.onKeyDown?.(e)
        }
        onKeyDown(e)
      }
    })}
  </Tooltip>
})


Popconfirm.defaultProps = {
  placement: 'top',
  trigger: 'click',
  // okType: 'primary' as PopconfirmProps['okType'],
  icon: <ExclamationCircleFilled />,
  disabled: false
}

export default Popconfirm
