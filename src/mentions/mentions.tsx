import * as React from 'react';
import classNames from 'classnames';
import RcMentions from 'rc-mentions';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MentionsProps as RcMentionsProps } from 'rc-mentions/lib/Mentions';
import './mentions.less';
import Loading from '../loading';
import { prefixCls as prefix } from '../config';

const { Option } = RcMentions;

function loadingFilterOption() {
  return true;
}

interface MentionsConfig {
  prefix?: string | string[];
  split?: string;
}

interface MentionsEntity {
  prefix: string;
  value: string;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<MentionProps & React.RefAttributes<HTMLElement>> {
  Option: typeof Option;
  getMentions: (value: string, config?: MentionsConfig) => MentionsEntity[];
}

export interface MentionProps extends RcMentionsProps {
  /** 加载中 */
  loading?: boolean;
  /** 自动获得焦点 */
  autoFocus?: boolean;
  /** 自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 } */
  autoSize?: boolean | object;
  /** 默认值 */
  defaultValue?: string;
  /** 自定义过滤逻辑 */
  filterOption?: false | ((input: string, option: any) => boolean);
  /**	指定建议框挂载的 HTML 节点 */
  getPopupContainer?: () => HTMLElement;
  /**	当下拉列表为空时显示的内容 */
  notFoundContent?: React.ReactNode;
  /**	弹出层展示位置 */
  placement?: 'top' | 'bottom';
  /** 设置弹出方向 */
  direction?: 'ltr' | 'rtl';
  /**	设置触发关键字 */
  prefix?: string | string[];
  /** 设置选中项前后分隔符 */
  split?: string;
  /** 自定义触发验证逻辑 */
  validateSearch?: (text: string, props: RcMentionsProps) => boolean;
  /**	设置值 */
  value?: string;
  /**	失去焦点时触发 */
  onBlur?: React.FocusEventHandler;
  /**	值改变时触发 */
  onChange?: (text: string) => void;
  /**	获得焦点时触发 */
  onFocus?: React.FocusEventHandler;
  // onResize?: function({ width:any, height:any })
  /**	搜索时触发 */
  onSearch?: (text: string, prefix: string) => void;
  /** 选择选项时触发 */
  onSelect?: (option: any, prefix: string) => void;
  /** 类名 */
  className?: string;
  /** 设置不可操作 */
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InternalMentions: React.ForwardRefRenderFunction<unknown, MentionProps> = (props, _ref) => {
  const { className, disabled, loading, filterOption, children, notFoundContent, ...data } = props;
  const [focused, setFocused] = React.useState(false);

  const onFocus: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    if (props.onFocus) {
      props.onFocus(...args);
    }
    setFocused(true);
  };

  const onBlur: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    if (props.onBlur) {
      props.onBlur(...args);
    }

    setFocused(false);
  };

  const getNotFoundContent = () => {
    if (notFoundContent !== undefined) {
      return notFoundContent;
    }
    // 内容为空时自定义  缺少（空）Empty组件
    return notFoundContent;
  };

  const getOptions = () => {
    if (loading) {
      return (
        <Option value="ANTD_SEARCHING" disabled>
          <Loading loading={loading}>
            <div style={{ padding: '20px', transform: 'scale(0.5)' }}></div>
          </Loading>
        </Option>
      );
    }
    return children;
  };

  const getFilterOption = (): any => {
    if (loading) {
      return loadingFilterOption;
    }
    return filterOption;
  };

  const prefixCls = `${prefix}-mentions`;

  const mergedClassName = classNames(
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: focused,
    },
    className && className,
  );

  return (
    <RcMentions
      {...data}
      prefixCls={prefixCls}
      notFoundContent={getNotFoundContent()}
      className={mergedClassName}
      disabled={disabled}
      filterOption={getFilterOption()}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {getOptions()}
    </RcMentions>
  );
};

const Mentions = React.forwardRef<unknown, MentionProps>(InternalMentions) as CompoundedComponent;

Mentions.getMentions = (value: string = '', config?: MentionsConfig): MentionsEntity[] => {
  const { prefix = '@', split = ' ' } = config || {};
  const prefixList: string[] = Array.isArray(prefix) ? prefix : [prefix];

  return value
    .split(split)
    .map((str = ''): MentionsEntity | null => {
      let hitPrefix: string | null = null;

      prefixList.some(prefixStr => {
        const startStr = str.slice(0, prefixStr.length);
        if (startStr === prefixStr) {
          hitPrefix = prefixStr;
          return true;
        }
        return false;
      });

      if (hitPrefix !== null) {
        return {
          prefix: hitPrefix,
          value: str.slice(hitPrefix!.length),
        };
      }
      return null;
    })
    .filter((entity): entity is MentionsEntity => !!entity && !!entity.value);
};

Mentions.displayName = 'Mentions';
Mentions.Option = Option;

Mentions.defaultProps = {
  autoFocus: false,
  autoSize: false,
  notFoundContent: 'Not Found',
  placement: 'bottom',
  prefix: '@',
  split: ' ',
  direction: 'ltr',
};

export default Mentions;
