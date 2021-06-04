import * as React from 'react';
import RcPagination from 'rc-pagination';
import classNames from 'classnames';
import './pagination.less';
import Select from './Select';
import { prefixCls } from '../config';

export interface PaginationProps {
  /** 当前页数 */
  current?: number;
  /** 默认页 */
  defaultCurrent?: number;
  /** 每页默认项 */
  defaultPageSize?: number;
  /** 只有一页时是否隐藏分页器 */
  hideOnSinglePage?: boolean;
  //** 是否禁用 */
  disabled?: boolean;
  /** 页数变化的回掉 */
  onChange?: (page: number, pageSize: number) => void;
  /** pageSize 变化的回调 */
  onShowSizeChange?: (current: number, size: number) => void;
  /** 每页呈现数量 */
  pageSize?: number;
  /** 指定每页可以显示多少条 */
  pageSizeOptions: string[];
  /**	用于自定义页码的结构，可用于优化 SEO */
  itemRender?: (page: number, type: string, originalElement: React.ReactNode) => React.ReactNode;
  /** 数据总数 */
  total?: number;
  /** 当为 small 时，是小尺寸分页 */
  size?: 'default' | 'small';
  /** 是否显示较少页面内容 */
  showLessItems: boolean;
  /** 是否可以快速跳转至某页 */
  showQuickJumper: boolean | { goButton: React.ReactNode };
  /** 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true */
  showSizeChanger: boolean;
  /** 是否显示原生 tooltip 页码提示 */
  showTitle: boolean;
  /** 用于显示数据总量和当前数据顺序 */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  /** 当添加该属性时，显示为简单分页 */
  simple: boolean;
}

const Pagination: React.FC<PaginationProps> = props => {
  const { disabled, size } = props;

  const className = classNames(`${prefixCls}-pagination`, size, {
    'is-disabled': disabled,
  });
  const onChange = (page: number, pageSize: number) => {
    props.onChange?.(page, pageSize);
  };

  const getIconsProps = () => {
    let prevIcon = (
      <div className="flipIcon">
        <svg height="10" width="8" className="svgIcon">
          <polyline points="7,1 1,5 7,9" />
        </svg>
      </div>
    );
    let nextIcon = (
      <div className="flipIcon">
        <svg height="10" width="8" className="svgIcon">
          <polyline points="0,1 6,5 0,9" />
        </svg>
      </div>
    );
    let jumpIcon = (
      <a className={`item-link`}>
        <div className={`item-container`}>
          <span className={`item-ellipsis`}>...</span>
        </div>
      </a>
    );
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon: jumpIcon,
      jumpNextIcon: jumpIcon,
    };
  };

  return (
    <RcPagination
      prefixCls={prefixCls}
      {...getIconsProps()}
      {...props}
      onChange={onChange}
      selectComponentClass={Select(size)}
      className={className}
    />
  );
};

Pagination.defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  disabled: false,
  pageSizeOptions: ['10', '20', '30', '40', '50'],
  hideOnSinglePage: false,
  showLessItems: false,
  showQuickJumper: false,
  showTitle: false,
  size: 'default',
  total: 0,
};

export default Pagination;
