import { Deploy } from "@/models/deploy/deploy.models"
import { dropData } from "@/types/deploy.types"
import { getNinjas, getNinja } from "@/utils/ninja/ninja.utils"
import { Row, Col, OverlayTrigger, Button, Tooltip } from "react-bootstrap"

export function DeployFooter({ dropped }: { dropped: dropData }) {
  // inefficient

  const rows: string[][] = [
    Array<string>(5).fill(""),
    Array<string>(5).fill(""),
    Array<string>(5).fill("")
  ]

  for (const [row_col, ninja] of dropped.entries()) {
    const [row_check, col_check] = [/row-\d/.exec(row_col), /col-\d/.exec(row_col)]
    if (!row_check || !col_check) continue
    const row = row_check[0].split("-")[1]
    const col = col_check[0].split("-")[1]
    rows[Number(row)][Number(col)] = ninja.replaceAll("-", " ")
  }

  const [row1, row2, row3] = rows
  const deploy = new Deploy(
    [getNinja(row2[1]), getNinja(row2[2]), getNinja(row2[3])],
    getNinjas([...row1, row2[0], row2[row2.length - 1], ...row3])
  )

  return (
    <Row>
      <Col lg={5} sm={4} className="my-1">
        <OverlayTrigger
          placement="top"
          trigger={["hover", "focus"]}
          overlay={
            <Tooltip id="tip-fix-pipe">
              Click here to fix pipe!
            </Tooltip>
          }
        >
          <Button variant="info">Connected Pipe: { deploy.connected_pipe() }</Button>
        </OverlayTrigger>
      </Col>
      <Col lg={7} sm={8} className="my-1">
        <OverlayTrigger
          placement="top"
          trigger={"focus"}
          overlay={
            <Tooltip id="copy-clipboard">
              Copied to clipboard!
            </Tooltip>
          }
        >
          <Button
            variant="info"
            onClick={async (ev) => {
              const content = ev.currentTarget.textContent || ""
              const state = await navigator.permissions.query({ name: "clipboard-write" })
              if (!(state.state === "granted")) return;
              navigator.clipboard.writeText(content)
            }}
            >
            Total Attributes: {[...deploy.totalCombo()].map(([attr, num]) => `${attr}: ${num}`).join(", ")}
          </Button>
        </OverlayTrigger>
      </Col>
    </Row>
  )
}