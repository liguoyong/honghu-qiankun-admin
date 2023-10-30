import antd from './antd.ts'
import basic from './basic.ts'
import components from './components.ts'
import { icons } from '../../Left/index.tsx'
import DragPanel from '../../Left/DragPanel.tsx'
import TreePanel from '../../TreePanel/index.tsx'
import React, { ReactElement } from 'react'

const menus: {
  key: string
  icon: keyof typeof icons
  panel: ReactElement
}[] = [
  {
    key: 'tree',
    icon: 'tree',
    panel: <TreePanel />,
  },
  {
    key: 'basic',
    icon: 'HTML5',
    panel: <DragPanel data={basic} />,
  },
  {
    key: 'antd',
    icon: 'antd',
    panel: <DragPanel data={antd} />,
  },
  {
    key: 'components',
    icon: 'components',
    panel: <DragPanel data={components} />,
  },
]

export default menus
