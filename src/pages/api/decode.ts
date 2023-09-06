import { NextApiRequest, NextApiResponse } from "next"
import { ShortCrypt } from "short-crypt"

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  if (!process.env.KEY)
    return resp.status(500).json({ message: "Invalid secret key!" })
  if (!req.query.code)
    return resp.status(422).json({ message: "Missing 'code' parameter!" })
  if (!(typeof req.query.code == "string"))
    return resp.status(422).json({ message: "code param must be a string!" })
  const sc = new ShortCrypt(process.env.KEY)
  const dec = sc.decryptQRCodeAlphanumeric(req.query.code)
  if (typeof dec == "boolean")
    return resp.status(404).json({ message: "Failed to decode!" })
  const jsonstring = new TextDecoder().decode(dec)
  resp.status(200).json({ data: JSON.parse(jsonstring) })
}
