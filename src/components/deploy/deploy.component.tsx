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
  const deploy = getDeployFromDropped(dropped);
  const [showCopyNinja, setShowCopy] = useState(false);
  return (
    <div>
      <p className="fs-4 teko-font mt-3  mb-2">Total Attrubute : </p>
      <OverlayTrigger placement="top" trigger={'focus'} overlay={<Tooltip id="copy-clipboard">Copied to clipboard!</Tooltip>}>
        <Button
          className="fs-5 fw-normal border-2 text-uppercase   align-self-start"
          variant="outline-primary"
          onClick={async (ev) => {
            const content = ev.currentTarget.textContent || '';
            try {
              await navigator.clipboard.writeText(content);
            } catch (e) {
              alert('Copy ke clipboard gagal!');
            }
          }}
        >
          {[...deploy.totalCombo()].map(([attr, num]) => `${attr}: ${num}`).join(', ')}
        </Button>
      </OverlayTrigger>
      <ModalCopyNinja setShow={setShowCopy} show={showCopyNinja} deploy={deploy} />
    </div>
  );
}

export function ConectedPipe({ dropped }: { dropped: dropData }) {
  const deploy = getDeployFromDropped(dropped);
  const [showCopyNinja, setShowCopy] = useState(false);
  return (
    <>
      <OverlayTrigger placement="right" trigger={['hover', 'focus']} overlay={<Tooltip id="tip-fix-pipe">Click untuk fix pipa!</Tooltip>}>
        <Button
          className="fs-5 fw-normal border-2 text-uppercase mt-3 align-self-start "
          variant="outline-primary"
          onClick={async () => {
            for (const row of deploy.rows) {
              for (const ninja of row) {
                if (ninja.name === 'null') return alert('Salah satu kolom tidak boleh kosong!');
              }
            }
            try {
              const txt = `deploy = Deploy.from_row(${deploy.toString()})`;
              await navigator.clipboard.writeText(txt);
              alert('ninja berhasil dicopy ke clipboard!\nsilahkan paste di gcolab\npopup mungkin diblokir');
              window.open('https://colab.research.google.com/drive/1B5Tv9P4-fzFmQs92q98cvmkQBrqnQeeK', '_blank');
            } catch (e) {
              alert('Copy ke clipboard gagal!');
              setShowCopy(true);
            }
          }}
        >
          Connected Pipe: {deploy.connected_pipe()}
        </Button>
      </OverlayTrigger>
      <ModalCopyNinja setShow={setShowCopy} show={showCopyNinja} deploy={deploy} />
    </>
  );
}
