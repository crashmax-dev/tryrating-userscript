import {
  createDraggable,
  DragDropProvider,
  DragDropSensors,
  DragOverlay
} from '@thisbeyond/solid-dnd'
import type { DragEventHandler } from '@thisbeyond/solid-dnd'
import type { FlowComponent } from 'solid-js'

import { createLocalStore } from '../../utils/create-local-storage.js'

interface Position {
  top: string
  left: string
}

const [widgetPosition, setWidgetPosition] = createLocalStore<Position>(
  'widget-position',
  {
    top: '0px',
    left: '0px'
  }
)

export function resetWidgetPosition(): void {
  setWidgetPosition({
    top: '0px',
    left: '0px'
  })
}

const Draggable: FlowComponent<{ id: number }> = (props) => {
  const draggable = createDraggable(props.id)
  return (
    <div
      use:draggable
      class="tryrating-widget draggable absolute"
      classList={{ 'opacity-25': draggable.isActiveDraggable }}
      style={{ top: widgetPosition.top, left: widgetPosition.left }}
    >
      {props.children}
    </div>
  )
}

export const WidgetDraggableProvider: FlowComponent = (props) => {
  let transform = { x: 0, y: 0 }

  const onDragMove: DragEventHandler = ({ overlay }) => {
    if (overlay) {
      transform = { ...overlay.transform }
    }
  }

  const onDragEnd: DragEventHandler = ({ draggable }) => {
    const node = draggable.node
    const top = `${node.offsetTop + transform.y}px`
    const left = `${node.offsetLeft + transform.x}px`
    setWidgetPosition({ top, left })
  }

  return (
    <DragDropProvider
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
    >
      <DragDropSensors />
      <Draggable id={1}>{props.children}</Draggable>
      <DragOverlay>
        {/* @ts-ignore */}
        {(draggable) => (
          <>
            <div class="widget-drag-overlay">
              <span class="text">alt+3 reset position</span>
            </div>
            {draggable}
          </>
        )}
      </DragOverlay>
    </DragDropProvider>
  )
}
