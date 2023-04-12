import { dropData } from "@/types/deploy.types";
import { SetStateAction, Dispatch } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";

export function DeployTopButton({ setDropped, setChoosed }:
  {
    setDropped: Dispatch<SetStateAction<dropData>>,
    setChoosed: Dispatch<SetStateAction<string>>
  }
) {
  return (
    <>
      <DropdownButton title="Choose Ninja" className="d-inline">
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
        className="mx-2"
        onClick={
          () => setDropped(new Map())
        }
      >
        Clear Deploy
      </Button>
    </>
  )
}