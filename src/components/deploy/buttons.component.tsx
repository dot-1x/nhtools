import { dropData } from "@/types/deploy.types";
import { SetStateAction, Dispatch, useState } from "react";
import { Button, Dropdown, DropdownButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import { PromptSave } from "./modal.component";

export function DeployTopButton({ setDropped, setChoosed }:
  {
    setDropped: Dispatch<SetStateAction<dropData>>,
    setChoosed: Dispatch<SetStateAction<string>>
  }
) {
  const [showsave, setShowSave] = useState(false)
  return (
    <>
      <DropdownButton title="Choose Ninja" className="d-inline my-1">
        {
        ["SSS", "SS", "S", "A", "B", "C", "D"].map(
            v => (
            <Dropdown.Item key={v} onClick={ev => setChoosed(ev.currentTarget.id)} id={v}>
              {v}
            </Dropdown.Item>
          )
        )
        }
      </DropdownButton>
      <Button
        variant="danger"
        className="m-1"
        onClick={
          () => setDropped(new Map())
        }
      >
        Clear Deploy
      </Button>
      <OverlayTrigger
        placement="top"
        trigger={["hover", "focus"]}
        overlay={
          <Tooltip id="tip-save-deploy">
            Click to save deploy
          </Tooltip>
        }
      >
        <Button variant="info" className="my-1" onClick={() => setShowSave(true)}>
          Save Deploy
        </Button>
      </OverlayTrigger>

      <PromptSave show={ showsave } setShow={ setShowSave } />
    </>
  )
}