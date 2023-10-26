import { comboMap, sortStratMap, sortStratType } from "@/types/combo.type"
import { getAllCombo } from "@/utils/combo.utils"
import { Dispatch, MutableRefObject, SetStateAction } from "react"
import {
  Button,
  DropdownButton,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"

export function TotalNinja({ totalNinjas }: { totalNinjas: number }) {
  return (
    <>
      <OverlayTrigger
        placement={"right"}
        overlay={
          <Tooltip id={`tooltip-${"right"}`}>
            Maksimal total ninja <strong>15</strong>.
          </Tooltip>
        }
      >
        <div className="d-flex flex-row justify-content-start align-items-center mb-4 ">
          <p className=" bg-transparent border border-2 border-primary text-primary rounded fs-5 py-1 px-4 teko-font">
            Total Ninja: {totalNinjas}
          </p>
        </div>
      </OverlayTrigger>
    </>
  )
}

export function Filter({
  stratRef,
  setCombos,
  combos,
}: {
  setCombos: Dispatch<SetStateAction<comboMap>>
  stratRef: MutableRefObject<sortStratType>
  combos: comboMap
}) {
  return (
    <DropdownButton title="Urut Sesuai" className="mb-4">
      {["Nama", "Attack", "Defend", "HP", "Agility"].map((v) => (
        <Dropdown.Item
          key={v}
          id={v}
          onClick={() => {
            stratRef.current = v as sortStratType
            setCombos({
              combo_choosed: combos.combo_choosed,
              combo_select: [...getAllCombo()]
                .sort(sortStratMap[v as sortStratType])
                .map((v) => v.name)
                .filter((v) => !combos.combo_choosed.includes(v)),
            })
          }}
        >
          {v}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}

export function Clear({
  setCombos,
  setNinjas,
}: {
  setCombos: Dispatch<SetStateAction<comboMap>>
  setNinjas: Dispatch<SetStateAction<number>>
}) {
  return (
    <Button
      variant="danger"
      className="mb-4"
      onClick={() => {
        setCombos({
          combo_choosed: [],
          combo_select: [...getAllCombo()].map((v) => v.name).sort(),
        })
        setNinjas(0)
      }}
    >
      Hapus terpilih !
    </Button>
  )
}
