import { Deploy } from "@/models/deploy/deploy.models";
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
          <Form.Text>
            Fitur save deploy masih belum tersedia
          </Form.Text>
          <Form.Group className="mb-3" controlId="deployName">
            <Form.Label>Nama Deploy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama Deploy"
              autoFocus
              name="deployname"
              required
            />
          </Form.Group>
        </ModalBody>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={() => setShow(false)} disabled>Simpan</Button>
      </Modal.Footer>
    </Form>
    </Modal>
  )
}

export function ModalCopyNinja({ setShow, show, deploy }: {setShow: Dispatch<SetStateAction<boolean>>, show: boolean, deploy: Deploy}) {
  return (<Modal
      show={ show }
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="modal-show-pipe"
      centered
    >
    <Modal.Header closeButton closeVariant="primary">
      <Modal.Title id="modal-show-pipe">
        Fix pipa
      </Modal.Title>
    </Modal.Header>
      <ModalBody>
      <h3>
        silahkan copy text di bawah lalu paste di gcolab
      </h3>
      <Modal.Dialog>
        deploy = Deploy.from_row({deploy.toString()})
      </Modal.Dialog>
      </ModalBody>
    <Modal.Footer>
      <Button variant="primary" type="button" onClick={() => setShow(false)}>Tutup</Button>
    </Modal.Footer>
  </Modal>
  )
}