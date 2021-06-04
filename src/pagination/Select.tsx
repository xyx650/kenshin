import * as React from 'react';
import Select from '../select/select';

interface SelectInterface extends React.FC<any> {
  Option: typeof Select.Option;
}

const PoginationSelect = (size: string | undefined): any => {
  const MiniSelect: SelectInterface = props => {
    return <Select {...props} prefixCls="kenshin" size={size} />;
  };
  MiniSelect.Option = Select.Option;
  return MiniSelect;
};

export default PoginationSelect;
