import { NextApiRequest, NextApiResponse } from "next"
import { ShortCrypt } from "short-crypt"

export default async function handler(
  req: NextApiRequest,
  resp: NextApiResponse
) {
  if (req.method != "POST")
    return resp.status(403).json({ message: "Method Not Allowed" })
  if (!process.env.KEY)
    return resp.status(500).json({ message: "Missing secret key!" })
  const sc = new ShortCrypt(process.env.KEY)
  const enc = sc.encryptToQRCodeAlphanumeric(req.body)
  resp.status(200).json({ message: enc })
}
