import React, { ReactElement } from 'react'
import { FieldNode } from '../schema/types.ts'
import DragItem from './DragItem.tsx'

interface Props {
  data: FieldNode[]
}

export default function DragPanel({ data }: Props): ReactElement {
  return (
    <>
      {data.map((d) => (
        <DragItem key={d.type} data={d} />
      ))}
    </>
  )
}
