import { NextApiRequest, NextApiResponse } from "next";
import fetchData from "../../lib/helpers/fetcher";
const config = require("dotenv").config();

const steamUrl = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2"
const key = "?key=" + (process.env.STEAM_API_KEY || "nokey");

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "GET") res.status(405).end("Method not allowed");
    const reqSteamUserIds = req.query?.steamUserIds;
    if(!reqSteamUserIds){
        res.status(400).json({ error: "Missing steamUserId(s)" });
        return;
    }
    const input = `&steamids=${reqSteamUserIds}`;
    const finalUrl = steamUrl + key + input;
    const playerInfos = fetchData(finalUrl);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(await playerInfos);
}