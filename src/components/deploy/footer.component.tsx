import { Row, Col, OverlayTrigger, Button, Tooltip } from "react-bootstrap"

export function DeployFooter() {
  return (
    <footer>
      <Row>
        <Col lg={5} sm={4} className="p-1">
          <OverlayTrigger
            placement="auto"
            trigger={"hover"}
            overlay={
              <Tooltip id="tip-fix-pipe">
                Click here to fix pipe!
              </Tooltip>
            }
          >
            <Button variant="info">Connected Pipe: 7</Button>
          </OverlayTrigger>
        </Col>
        <Col lg={7} sm={8} className="p-1">
          <OverlayTrigger
            placement="top"
            trigger={"click"}
            overlay={
              <Tooltip id="copy-clipboard">
                Copied to clipboard!
              </Tooltip>
            }
          >
            <Button
              variant="info"
              onClick={(ev) => navigator.clipboard.writeText(ev.currentTarget.textContent || "")}
              >
              Total Attributes: (ATK: 149 DEF: 45 HP: 112 AGI: 82)
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
    </footer>
  )
}