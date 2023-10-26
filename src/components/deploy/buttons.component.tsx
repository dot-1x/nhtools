import { dropData } from "@/types/deploy.types"

import { SetStateAction, Dispatch, useState } from "react"
import {
  Button,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { PromptSave, PropmtLoad } from "./modal.component"

export function DeployTopButton({ setDropped, dropped }: { setDropped: Dispatch<SetStateAction<dropData>>; dropped: dropData }) {
  const [showload, setShowLoad] = useState(false);
  const [showsave, setShowSave] = useState(false);
  return (
    <div className="d-flex flex-row ">
      <OverlayTrigger placement="top" trigger={['hover', 'focus']} overlay={<Tooltip id="tip-save-deploy">Click to copy deploy code</Tooltip>}>
        <Button
          variant="primary"
          className="m-1"
          onClick={async () => {
            if (!window) return alert('Maaf, fitur tidak tersedia di platform anda!');
            if (dropped.size < 1) return alert('Kolom Tidak Boleh Kosong!');
            setShowSave(true);
          }}
        >
          Save Deploy
        </Button>
      </OverlayTrigger>
      <Button
        variant="info"
        className="m-1"
        onClick={() => {
          setShowLoad(true);
        }}
      >
        Load Deploy
      </Button>
      <Button variant="danger" className="m-1" onClick={() => setDropped(new Map())}>
        Clear Deploy
      </Button>
      <PromptSave show={showsave} setShow={setShowSave} dropdata={dropped} />
      <PropmtLoad show={showload} setShow={setShowLoad} setDropped={setDropped} />
    </div>
  );
}

export function SelectNinjaButton({ setChoosed }: { setChoosed: Dispatch<SetStateAction<string>> }) {
  return (
    <DropdownButton title="Choose Ninja" className="mb-4">
      {['UR', 'SSS', 'SS', 'S', 'A', 'B', 'C', 'D'].map((v) => (
        <Dropdown.Item key={v} onClick={(ev) => setChoosed(ev.currentTarget.id)} id={v}>
          {v}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

