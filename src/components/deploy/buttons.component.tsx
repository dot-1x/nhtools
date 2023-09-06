import { dropData } from "@/types/deploy.types"

import { SetStateAction, Dispatch, useState } from "react"
import {
  Button,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { PropmtLoad } from "./modal.component"

export function DeployTopButton({
  setDropped,
  setChoosed,
  dropped,
}: {
  setDropped: Dispatch<SetStateAction<dropData>>
  setChoosed: Dispatch<SetStateAction<string>>
  dropped: dropData
}) {
  const [showload, setShowLoad] = useState(false)
  return (
    <>
      <DropdownButton title="Choose Ninja" className="d-inline m-1">
        {["UR", "SSS", "SS", "S", "A", "B", "C", "D"].map((v) => (
          <Dropdown.Item
            key={v}
            onClick={(ev) => setChoosed(ev.currentTarget.id)}
            id={v}
          >
            {v}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button
        variant="danger"
        className="m-1"
        onClick={() => setDropped(new Map())}
      >
        Clear Deploy
      </Button>
      <OverlayTrigger
        placement="top"
        trigger={["hover", "focus"]}
        overlay={
          <Tooltip id="tip-save-deploy">Click to copy deploy code</Tooltip>
        }
      >
        <Button
          variant="info"
          className="m-1"
          onClick={async () => {
            if (dropped.size < 1) return alert("Kolom Tidak Boleh Kosong!")
            const resp = await fetch("/api/encrypt", {
              method: "POST",
              body: JSON.stringify(Object.fromEntries(dropped.entries())),
            })
            const data = await resp.json()

            await navigator.clipboard.writeText(data.message)
            alert("Code sudah di copy ke clipboard!")
          }}
        >
          Save Deploy
        </Button>
      </OverlayTrigger>
      <Button
        variant="info"
        className="m-1"
        onClick={() => {
          setShowLoad(true)
        }}
      >
        Load Deploy
      </Button>
      <PropmtLoad
        show={showload}
        setShow={setShowLoad}
        setDropped={setDropped}
      />
    </>
  )
}
