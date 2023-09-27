import { comboMap, sortStratMap, sortStratType } from "@/types/combo.type"
import { getAllCombo } from "@/utils/combo.utils"
import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { Button, DropdownButton, Dropdown } from "react-bootstrap"

export function ComboButton({
  totalNinjas,
  setCombos,
  setNinjas,
  stratRef,
}: {
  totalNinjas: number
  setCombos: Dispatch<SetStateAction<comboMap>>
  setNinjas: Dispatch<SetStateAction<number>>
  stratRef: MutableRefObject<sortStratType>
}) {
  return (
    <>
      <Button
        variant="danger"
        className="m-1"
        onClick={() => {
          setCombos({
            combo_choosed: [],
            combo_select: [...getAllCombo()].map((v) => v.name).sort(),
          })
          setNinjas(0)
        }}
      >
        Hapus terpilih!
      </Button>
      <Button variant="info" className="m-1">
        Total Ninja: {totalNinjas}
      </Button>
      <DropdownButton title="Urut Sesuai" className="d-inline my-1">
        {["Nama", "Attack", "Defend", "HP", "Agility"].map((v) => (
          <Dropdown.Item
            key={v}
            id={v}
            onClick={() => {
              stratRef.current = v as sortStratType
              setCombos({
                combo_choosed: [],
                combo_select: [...getAllCombo()]
                  .sort(sortStratMap[v as sortStratType])
                  .map((v) => v.name),
              })
            }}
          >
            {v}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  )
}
