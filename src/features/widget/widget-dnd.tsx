import {
  createDraggable,
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  DragOverlay
} from '@thisbeyond/solid-dnd'
import { createLocalStore } from '../../utils/create-local-storage.js'
import type { FlowComponent } from 'solid-js'

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

export function resetWidgetPosition() {
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
      class="widget-draggable widget-absolute"
      classList={{ 'widget-opacity-25': draggable.isActiveDraggable }}
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
        <div class="widget-drag-overlay">
          <span class="widget-drag-text">alt+3 reset position</span>
        </div>
        {props.children}
      </DragOverlay>
    </DragDropProvider>
  )
}
