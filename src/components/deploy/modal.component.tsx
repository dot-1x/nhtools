import { Dispatch, SetStateAction } from "react";
import { Modal, ModalBody } from "react-bootstrap";

export function PromptSave({ setShow, show }: {setShow: Dispatch<SetStateAction<boolean>>, show: boolean}) {
  return (
    <Modal
      show={ show }
      onHide={() => setShow(false)}
    >
      <Modal.Title>
        Save Deploy Saat Ini
      </Modal.Title>
      <ModalBody>

      </ModalBody>
    </Modal>
  )
}