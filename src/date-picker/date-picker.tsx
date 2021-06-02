import type { Moment } from 'moment'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'
import type {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps
} from './picker';
import generatePicker from './picker'
import './index.less'

export type DatePickerProps = PickerProps<Moment>;
export type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Moment>;

const DatePicker = generatePicker<Moment>(momentGenerateConfig)

export default DatePicker

