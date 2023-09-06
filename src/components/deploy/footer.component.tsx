import { dropData } from "@/types/deploy.types"
import {
  Row,
  Col,
  OverlayTrigger,
  Button,
  Tooltip,
  Alert,
} from "react-bootstrap"
import { ModalCopyNinja } from "./modal.component"
import { useState } from "react"
import { getDeployFromDropped } from "@/utils/deploy.utils"

export function DeployFooter({ dropped }: { dropped: dropData }) {
  const deploy = getDeployFromDropped(dropped)
  const [showCopyNinja, setShowCopy] = useState(false)
  return (
    <Row>
      <Col lg={5} sm={4} className="my-1">
        <OverlayTrigger
          placement="top"
          trigger={["hover", "focus"]}
          overlay={<Tooltip id="tip-fix-pipe">Click untuk fix pipa!</Tooltip>}
        >
          <Button
            variant="info"
            onClick={async () => {
              for (const row of deploy.rows) {
                for (const ninja of row) {
                  if (ninja.name === "null")
                    return alert("Salah satu kolom tidak boleh kosong!")
                }
              }
              try {
                const txt = `deploy = Deploy.from_row(${deploy.toString()})`
                await navigator.clipboard.writeText(txt)
                alert(
                  "ninja berhasil dicopy ke clipboard!\nsilahkan paste di gcolab\npopup mungkin diblokir"
                )
                window.open(
                  "https://colab.research.google.com/drive/1B5Tv9P4-fzFmQs92q98cvmkQBrqnQeeK",
                  "_blank"
                )
              } catch (e) {
                alert("Copy ke clipboard gagal!")
                setShowCopy(true)
              }
            }}
          >
            Connected Pipe: {deploy.connected_pipe()}
          </Button>
        </OverlayTrigger>
      </Col>
      <Col lg={7} sm={8} className="my-1">
        <OverlayTrigger
          placement="top"
          trigger={"focus"}
          overlay={<Tooltip id="copy-clipboard">Copied to clipboard!</Tooltip>}
        >
          <Button
            variant="info"
            onClick={async (ev) => {
              const content = ev.currentTarget.textContent || ""
              try {
                await navigator.clipboard.writeText(content)
              } catch (e) {
                alert("Copy ke clipboard gagal!")
              }
            }}
          >
            Total Attributes:{" "}
            {[...deploy.totalCombo()]
              .map(([attr, num]) => `${attr}: ${num}`)
              .join(", ")}
          </Button>
        </OverlayTrigger>
      </Col>
      <ModalCopyNinja
        setShow={setShowCopy}
        show={showCopyNinja}
        deploy={deploy}
      />
    </Row>
  )
}
