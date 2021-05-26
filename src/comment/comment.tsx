import * as React from 'react'
import classnames from 'classnames'
import './index.less'
import { prefixCls as prefix } from '@/config'

export interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @description 在评论内容下面呈现的操作项列表
   */
  actions?: React.ReactNode[];
  /**
   * @description  要显示为注释作者的元素
   */
  author?: React.ReactNode;
  /**
   * @description  要显示为评论头像的元素
   */
  avatar?: React.ReactNode;
  /**
   * @description    评论的主要内容
   */
  content?: React.ReactNode;
  /**
   * @description    展示时间描述
   */
  datetime?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties
}

const Comment: React.FC<CommentProps> = props => {
  const {
    className,
    avatar,
    actions,
    author,
    datetime,
    content,
    prefixCls = `${prefix}-comment`,
    children,
    ...otherProps
  } = props

  const avatarDom = avatar && <div className={`${prefixCls}-avatar`}>
    {typeof avatar === 'string' ? <img src={avatar} alt='comment-avatar' /> : avatar}
  </div>

  const actionDom = actions && actions.length && <ul className={`${prefixCls}-actions`}>
    {actions.map((action, index) => (
      <li key={`action-${index.toString()}`}>{action}</li>
    ))}
  </ul>

  const authorContent = (author || datetime) && <div className={`${prefixCls}-content-author`}>
    {author && <span className={`${prefixCls}-content-author-name`}>{author}</span>}
    {datetime && <span className={`${prefixCls}-content-author-time`}>{datetime}</span>}
  </div>

  const contentDom = <div className={`${prefixCls}-content`}>
    {authorContent}
    <div className={`${prefixCls}-content-detail`}>{content}</div>
    {actionDom}
  </div>

  return <div
    {...otherProps}
    className={classnames(prefixCls, className)}
  >
    <div className={`${prefixCls}-inner`}>
      {avatarDom}
      {contentDom}
    </div>
    {children && <div className={classnames(`${prefixCls}-nested`)}>{children}</div>}
  </div>
}

export default Comment
