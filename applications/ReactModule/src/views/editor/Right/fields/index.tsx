import OptionEditor from './OptionEditor.tsx';
import TableColumns from './TableColumns.tsx';
import EditableTable from './EditableTable.tsx';
import Input, { TextArea } from './Input.tsx';
import Table from './Table/index.tsx';
import Color from './Color/index.tsx';
import Radio from './Radio.tsx';
import { Select, InputNumber } from 'antd';

export const fields = {
  Text: Input,
  Number: InputNumber,
  OptionEditor: OptionEditor,
  TableColumns,
  EditableTable,
  Table,
  Color,
  Radio,
  Select,
  TextArea: TextArea,
};
