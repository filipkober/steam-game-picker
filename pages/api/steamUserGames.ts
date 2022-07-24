import { NextApiRequest, NextApiResponse } from "next";
import fetchData from "../../lib/helpers/fetcher";
const config = require("dotenv").config();

const steamUrl = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1"
const key = "?key=" + (process.env.STEAM_API_KEY || "nokey");

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "GET") res.status(405).end("Method not allowed");
    const reqSteamUserId = req.query?.steamUserId;
    if(!reqSteamUserId){
        res.status(400).json({ error: "Missing steamUserId" });
        return;
    }
    const input = `&input_json={"steamid":${reqSteamUserId},"include_appinfo":true}`;
    const finalUrl = steamUrl + key + input;
    
    const games = fetchData(finalUrl);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(await games);
}