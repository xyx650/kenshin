import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
// import './index.less'

export default (props: any, state: object) => {
  const { ...restProps } = props;
  console.log(props, restProps);

  return (
    <button className="button" {...restProps}>
      {props.children}
    </button>
  );
};
