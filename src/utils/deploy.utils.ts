import { Deploy } from "@/models/deploy/deploy.models"
import { dropData } from "@/types/deploy.types"
import { getNinjas, getNinja } from "@/utils/ninja.utils"

const row_checker = /row-\d/
const col_checker = /col-\d/

export function getDeployFromDropped(dropdata: dropData) {
  const rows: string[][] = [
    Array<string>(5).fill(""),
    Array<string>(5).fill(""),
    Array<string>(5).fill(""),
  ]

  for (const [row_col, ninja] of dropdata.entries()) {
    const [row_check, col_check] = [
      row_checker.exec(row_col),
      col_checker.exec(row_col),
    ]
    if (!row_check || !col_check) continue
    const row = row_check[0].split("-")[1]
    const col = col_check[0].split("-")[1]
    rows[Number(row)][Number(col)] = ninja.replaceAll("-", " ")
  }

  const [row1, row2, row3] = rows
  return new Deploy(
    [getNinja(row2[1]), getNinja(row2[2]), getNinja(row2[3])],
    getNinjas([...row1, row2[0], row2[row2.length - 1], ...row3])
  )
}
