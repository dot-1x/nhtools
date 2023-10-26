import { arrangeData } from "@/types/combo.type"
import { arrangeCombo, getCombo, stripDragID } from "@/utils/combo.utils"
import { useDraggable } from '@dnd-kit/core';
import { Image, ListGroup } from 'react-bootstrap';

export function DragCombo({ name, arrangeData, active }: { name: string; arrangeData: arrangeData; active?: boolean }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: name });
  const combo = getCombo(name);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={() => {
        arrangeCombo(arrangeData);
      }}
    >
      <div className={` ${active ? 'bg-primary text-dark-primary' : 'bg-soft-dark-primary text-primary'}  d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center px-3 py-2 mb-4 me-3 me-lg-3 rounded `}>
        <div className=" d-flex flex-column justify-content-center">
          <p className="teko-font" style={{ fontSize: '27px' }}>
            {stripDragID(name)}
          </p>
          <div className="pe-lg-5 ps-2">
            {combo.ninjasName.map((v) => (
              <Image className="rounded-circle mb-1 mb-md-2 border border-3 border-dark-primary " style={{ marginLeft: '-10px' }} alt={name} src={`/assets/roleHeads/${v}.png`} width={38} height={38} key={v} />
            ))}
          </div>
        </div>
        <div className="  align-self-end mt-3 mt-lg-0 text-center" style={{ minWidth: '150px' }}>
          <p className="teko-font fs-6 text-primary bg-soft-dark-primary-3 px-2 py-1 rounded">{combo.attrValues}</p>
        </div>
      </div>
    </div>
  );
}
