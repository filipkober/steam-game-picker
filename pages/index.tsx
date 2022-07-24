import { NextPage } from "next";
import fetchData from '../lib/helpers/fetcher'
import { useEffect, useState } from "react";
import Game from "../components/Game";

const baseUrl = "http://localhost:3000/api/steamUserGames?steamUserId=";
const getPlayersUrl = "http://localhost:3000/api/steamUserInfo?steamUserIds=";
const playerIds = ["76561198178943205","76561199185830492"];
const playerIdsString = playerIds.join(",");
type Game = {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  owner?: string;
}
type Player = {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  lastlogoff: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
}

const Index: NextPage = () => {
  const [final, setFinal] = useState<boolean>(false);
  const [games, setGames] = useState<any>([]);
  useEffect(() => {

    

    let allGames: Game[] = [];
    async function doFetches(){

      const url2 = getPlayersUrl + playerIdsString;
      const data2 = await fetchData(url2);
      const players = data2.response.players;
      const playerNameMap = new Map<string, string>();
      players.forEach((player: Player) => {
        playerNameMap.set(player.steamid, player.personaname);
      })

      for(let playerId of playerIds){
        const url = baseUrl + playerId;
        const data = await fetchData(url);
        const games = data.response.games
        for(let game of games){
          game.owner = playerNameMap.get(playerId);          
        }
        allGames = allGames.concat(games);
      }
      //allGames = allGames.filter((game: Game) => (countGames(game, allGames) > 1));
      allGames.sort((a,b) => b.playtime_forever - a.playtime_forever);
      setGames(allGames);
      setFinal(true);
      
    }
    doFetches();
  },[])
  
  return (
    
    <>
    {(games && final) ? games.map((game: Game) => {
      return (
        
        <Game key={game.owner ? game.appid + game.owner : game.appid} appid={game.appid} name={game.name} playtime_forever={game.playtime_forever} owner={game.owner} />
      )
    }): <h1>Loading...</h1>}
    </>
  )
}
export default Index;