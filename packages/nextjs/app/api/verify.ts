import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("called api", req)

	const proof = req.body
    const app_id = "app_4020275d788fc6f5664d986dd931e5e6"
    const action = process.env.NEXT_PUBLIC_ACTION_ID ?? ""
	const verifyRes = (await verifyCloudProof(proof, app_id, action)) as IVerifyResponse
    console.log("api", app_id, action)
    if (verifyRes.success) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        res.status(200).send(verifyRes);
    } else {
        // This is where you should handle errors from the World ID /verify endpoint. 
        // Usually these errors are due to a user having already verified.
        res.status(400).send(verifyRes);
    }
}
