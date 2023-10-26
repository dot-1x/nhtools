import { getAvailableCombo } from "@/utils/combo.utils"
import { Table } from "react-bootstrap"

export function ComboTable({ ninjas }: { ninjas: string[] }) {
  const foundCombo = getAvailableCombo(ninjas)
  return (
    <Table variant="dark" striped>
      <thead>
        <tr>
          <th className="bg-soft-dark-primary-2">Combo</th>
          <th className="bg-soft-dark-primary-2">Ninjas</th>
          <th className="bg-soft-dark-primary-2">Attributes</th>
        </tr>
      </thead>
      <tbody>
        {foundCombo.map((combo) => (
          <tr key={combo.name}>
            <td>{combo.name}</td>
            <td>{combo.ninjasName.join(', ')}</td>
            <td>{combo.attrValues}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
