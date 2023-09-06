import { Deploy } from "@/models/deploy/deploy.models"
import { dropData } from "@/types/deploy.types"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { Button, Modal, ModalBody, Form } from "react-bootstrap"

export function PromptSave({
  setShow,
  show,
  dropdata,
}: {
  setShow: Dispatch<SetStateAction<boolean>>
  show: boolean
  dropdata: dropData
}) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="modal-prompt-save"
      centered
    >
      <Modal.Header closeButton closeVariant="primary">
        <Modal.Title id="modal-prompt-save">Simpan Deploy Saat Ini</Modal.Title>
      </Modal.Header>
      <ModalBody>
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
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setShow(false)
            console.log(dropdata)
          }}
        >
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export function ModalCopyNinja({
  setShow,
  show,
  deploy,
}: {
  setShow: Dispatch<SetStateAction<boolean>>
  show: boolean
  deploy: Deploy
}) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="modal-show-pipe"
      centered
    >
      <Modal.Header closeButton closeVariant="primary">
        <Modal.Title id="modal-show-pipe">Fix pipa</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <h3>silahkan copy text di bawah lalu paste di gcolab</h3>
        <Modal.Dialog>
          deploy = Deploy.from_row({deploy.toString()})
        </Modal.Dialog>
        <Link
          href={
            "https://colab.research.google.com/drive/1B5Tv9P4-fzFmQs92q98cvmkQBrqnQeeK"
          }
          target="_blank"
          id="btnToColab"
        >
          Click untuk pergi ke gcolab
        </Link>
      </ModalBody>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={() => setShow(false)}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export function PropmtLoad({
  setDropped,
  setShow,
  show,
}: {
  setDropped: Dispatch<SetStateAction<dropData>>
  setShow: Dispatch<SetStateAction<boolean>>
  show: boolean
}) {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="modal-prompt-save"
      centered
    >
      <Form
        onSubmit={async (ev) => {
          ev.preventDefault()
          const form = new FormData(ev.target as HTMLFormElement)
          const url = new URL(`${window.location.origin}/api/decode`)
          const deploycode = form.get("deploycode")
          if (typeof deploycode != "string") return
          url.searchParams.set("code", deploycode)
          const resp = await fetch(url)
          if (resp.status >= 300 || resp.status < 200)
            return alert("Oops.. code deploy yang anda masukan tidak valid!")
          const data = await resp.json()
          setShow(false)
          setDropped(new Map(Object.entries(data.data)))
        }}
      >
        <Modal.Header closeButton closeVariant="primary">
          <Modal.Title id="modal-prompt-save">
            Load Deploy Yang Sudah Disimpan
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form.Group className="mb-3" controlId="deploycode">
            <Form.Label>Code Deploy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Code Deploy"
              autoFocus
              name="deploycode"
              required
            />
          </Form.Group>
        </ModalBody>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Load
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
