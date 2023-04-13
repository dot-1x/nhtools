import { dropData } from "@/types/deploy.types";
import { SetStateAction, Dispatch } from "react";
import { Button, Dropdown, DropdownButton, OverlayTrigger, Tooltip } from "react-bootstrap";

export function DeployTopButton({ setDropped, setChoosed }:
  {
    setDropped: Dispatch<SetStateAction<dropData>>,
    setChoosed: Dispatch<SetStateAction<string>>
  }
) {
  return (
    <>
      <DropdownButton title="Choose Ninja" className="d-inline mx-1">
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
        className="mx-1"
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
        <Button variant="info" className="mx-1">
          Save Deploy
        </Button>
      </OverlayTrigger>
    </>
  )
}