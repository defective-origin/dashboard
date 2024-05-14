import { useState } from 'react'
import { Id } from './api.type'
import { Square } from 'tools/XY'

export type Place = Square

export type Widget = {
  id?: Id
  name?: string
  place: Place
}

export const WIDGETS = [
  { id: 1, name: 'WIDGET NAME', place: { v1: { x: 0, y: 0 }, v2: { x: 3, y: 3 } } },
  { id: 2, name: 'WIDGET NAME', place: { v1: { x: 0, y: 4 }, v2: { x: 1, y: 5 } } },
  { id: 3, name: 'WIDGET NAME', place: { v1: { x: 1, y: 4 }, v2: { x: 2, y: 5 } } },
  { id: 4, name: 'WIDGET NAME', place: { v1: { x: 2, y: 4 }, v2: { x: 3, y: 5 } } },
  { id: 5, name: 'WIDGET NAME', place: { v1: { x: 3, y: 4 }, v2: { x: 4, y: 5 } } },
  { id: 6, name: 'WIDGET NAME', place: { v1: { x: 4, y: 4 }, v2: { x: 5, y: 5 } } },
  { id: 7, name: 'WIDGET NAME', place: { v1: { x: 5, y: 4 }, v2: { x: 6, y: 5 } } },
  { id: 8, name: 'WIDGET NAME', place: { v1: { x: 0, y: 5 }, v2: { x: 6, y: 6 } } },
  { id: 9, name: 'WIDGET NAME', place: { v1: { x: 0, y: 6 }, v2: { x: 6, y: 10 } } },
  { id: 10, name: 'WIDGET NAME', place: { v1: { x: 9, y: 0 }, v2: { x: 18, y: 4 } } },
  { id: 11, name: 'WIDGET NAME', place: { v1: { x: 6, y: 4 }, v2: { x: 14, y: 7 } } },
  { id: 12, name: 'WIDGET NAME', place: { v1: { x: 6, y: 7 }, v2: { x: 14, y: 10 } } },
  { id: 13, name: 'WIDGET NAME', place: { v1: { x: 14, y: 4 }, v2: { x: 20, y: 5 } } },
  { id: 14, name: 'WIDGET NAME', place: { v1: { x: 14, y: 5 }, v2: { x: 20, y: 6 } } },
  { id: 15, name: 'WIDGET NAME', place: { v1: { x: 14, y: 6 }, v2: { x: 20, y: 7 } } },
  { id: 16, name: 'WIDGET NAME', place: { v1: { x: 14, y: 7 }, v2: { x: 17, y: 10 } } },
  { id: 17, name: 'WIDGET NAME', place: { v1: { x: 17, y: 7 }, v2: { x: 20, y: 10 } } },
  { id: 18, name: 'WIDGET NAME', place: { v1: { x: 18, y: 0 }, v2: { x: 20, y: 4 } } },
]

export const useWidgets = () => ({ loading: false, items: WIDGETS })

export const useWidget = (id?: Id) => {
  const [widget, setWidget] = useState<Widget>(WIDGETS.find((widget) => widget.id == id) as Widget)
  const update = (patch: Partial<Widget>) => setWidget((prev) => ({...prev, ...patch}))

  return { loading: false, widget, update }
}
