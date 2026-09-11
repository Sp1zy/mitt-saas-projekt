import { useState } from 'react';

// HTML5 drag and drop for a vertical list. Returns per-item props and the slot
// index a drop would land in, so the list can draw an insertion line.
export function useDragReorder(itemIds, onReorder) {
    const [draggedId, setDraggedId] = useState(null);
    const [dropSlot, setDropSlot] = useState(null);

    const reset = () => {
        setDraggedId(null);
        setDropSlot(null);
    };

    const finishDrop = () => {
        if (draggedId === null || dropSlot === null) {
            reset();
            return;
        }
        const fromIndex = itemIds.indexOf(draggedId);
        const targetIndex = dropSlot > fromIndex ? dropSlot - 1 : dropSlot;
        if (targetIndex !== fromIndex) onReorder(draggedId, targetIndex);
        reset();
    };

    const slotFromPointer = (dragEvent, itemIndex) => {
        const bounds = dragEvent.currentTarget.getBoundingClientRect();
        const isUpperHalf = dragEvent.clientY < bounds.top + bounds.height / 2;
        return isUpperHalf ? itemIndex : itemIndex + 1;
    };

    const dragPropsFor = (itemId, itemIndex) => ({
        draggable: true,
        onDragStart: (dragEvent) => {
            setDraggedId(itemId);
            if (dragEvent.dataTransfer) dragEvent.dataTransfer.effectAllowed = 'move';
        },
        onDragOver: (dragEvent) => {
            if (draggedId === null) return;
            dragEvent.preventDefault();
            setDropSlot(slotFromPointer(dragEvent, itemIndex));
        },
        onDrop: (dragEvent) => {
            dragEvent.preventDefault();
            finishDrop();
        },
        onDragEnd: reset,
    });

    return { draggedId, dropSlot, dragPropsFor };
}
