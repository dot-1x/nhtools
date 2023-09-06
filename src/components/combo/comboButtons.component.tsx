import { comboMap } from "@/types/combo.type"
import { getAllCombo } from "@/utils/combo.utils"
import { Dispatch, SetStateAction } from "react"
import { Button, DropdownButton, Dropdown } from "react-bootstrap"

export function ComboButton({
  totalNinjas,
  setCombos,
  setNinjas,
}: {
  totalNinjas: number
  setCombos: Dispatch<SetStateAction<comboMap>>
  setNinjas: Dispatch<SetStateAction<number>>
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
      {/* <DropdownButton title="Urut Sesuai" className="d-inline my-1">
          {
          ["Nama", "Attack", "Defend", "HP", "Agility"].map(
              v => (
              <Dropdown.Item key={v} id={v} onClick={() => setSort(v)}>
                {v}
              </Dropdown.Item>
            )
          )
          }
        </DropdownButton> */}
    </>
  )
}
