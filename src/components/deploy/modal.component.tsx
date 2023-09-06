import { Deploy } from "@/models/deploy/deploy.models"
import { dropData } from "@/types/deploy.types"
import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  Button,
  Modal,
  ModalBody,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap"

export function PromptSave({
  setShow,
  show,
  dropdata,
}: {
  setShow: Dispatch<SetStateAction<boolean>>
  show: boolean
  dropdata: dropData
}) {
  const [name, setName] = useState("")
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
            onChange={(ev) => setName(ev.target.value)}
            required
          />
        </Form.Group>
      </ModalBody>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={async () => {
            if (!name) return alert("Nama tidak boleh kosong")
            const resp = await fetch("/api/encrypt", {
              method: "POST",
              body: JSON.stringify(Object.fromEntries(dropdata.entries())),
            })
            const data = await resp.json()
            // await navigator.clipboard.writeText(data.message)
            if (!window.localStorage.getItem("deploy"))
              window.localStorage.setItem("deploy", "{}")
            const localData = JSON.parse(
              window.localStorage.getItem("deploy") || "{}"
            )
            localData[name] = data.message
            window.localStorage.setItem("deploy", JSON.stringify(localData))
            alert("Deploy berhasil tersimpan di browser anda!")
            setShow(false)
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
  const [depCode, setDepCode] = useState("")
  const [localStorage, setLocalStorage] = useState<{ [key: string]: string }>(
    {}
  )
  useEffect(() => {
    const localdata = window.localStorage.getItem("deploy")
    setLocalStorage(JSON.parse(localdata || "{}"))
  }, [])
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
          const url = new URL(`${window.location.origin}/api/decode`)
          url.searchParams.set("code", depCode)
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
          <Form.Group>
            <Form.Label>Pilih dari penyimpanan</Form.Label>
            <DropdownButton title="Pilih dari penyimpanan" variant="info">
              {Object.entries(localStorage).map(([key, val]) => (
                <Dropdown.Item key={key} onClick={() => setDepCode(val)}>
                  {key}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group className="mb-3" controlId="deploycode">
            <Form.Label>Code Deploy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Code Deploy"
              autoFocus
              name="deploycode"
              onChange={(ev) => setDepCode(ev.target.value)}
              value={depCode}
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
