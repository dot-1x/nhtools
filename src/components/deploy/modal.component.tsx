import { Dispatch, SetStateAction } from "react";
import { Button, Modal, ModalBody, Form } from "react-bootstrap";

export function PromptSave({ setShow, show }: {setShow: Dispatch<SetStateAction<boolean>>, show: boolean}) {
  return (
    <Modal
      show={ show }
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="modal-prompt-save"
      centered
    >
    <Form method="get" action="/deploy">
      <Modal.Header closeButton closeVariant="primary">
        <Modal.Title id="modal-prompt-save">
          Simpan Deploy Saat Ini
        </Modal.Title>
      </Modal.Header>
      <ModalBody>
          <Form.Group className="mb-3" controlId="deployName">
            <Form.Label>Nama Deploy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama Deploy"
              autoFocus
              name="deployname"
            />
          </Form.Group>
      </ModalBody>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={() => setShow(false)}>Simpan</Button>
      </Modal.Footer>
    </Form>
    </Modal>
  )
}