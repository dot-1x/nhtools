import { getAvailableCombo } from "@/utils/combo.utils"
import { Table } from "react-bootstrap"

export function ComboTable({ ninjas }: { ninjas: string[] }) {
  const foundCombo = getAvailableCombo(ninjas)
  return (
    <Table responsive variant="dark" striped>
      <thead>
        <tr>
          <th className="bg-soft-dark-primary-2" style={{ minWidth: '200px' }}>Combo Name</th>
          <th className="bg-soft-dark-primary-2" style={{ minWidth: '220px' }}>Ninjas</th>
          <th className="bg-soft-dark-primary-2" style={{ minWidth: '220px' }}>
            Attributes
          </th>
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
