import { dropData } from "@/types/deploy.types";
import { getAvailableCombo } from "@/utils/combo/combo.utils";
import { Table } from "react-bootstrap";

export function ComboTable({ dropped }: { dropped: dropData }) {
  const foundCombo = getAvailableCombo([...dropped.entries()].map(([_, ninja]) => ninja.replaceAll("-", " ")))
  return (
    <Table variant="dark" striped>
      <thead>
        <tr>
          <th>Combo Name</th>
          <th>Ninjas</th>
          <th>Attributes</th>
        </tr>
      </thead>
      <tbody>
        {
          foundCombo.map(
            combo => (
              <tr key={combo.name}>
                <td>{combo.name}</td>
                <td>{combo.ninjasName.join(", ")}</td>
                <td>{combo.attrValues}</td>
              </tr>
            )
          )
        }
      </tbody>
    </Table>
  )
}