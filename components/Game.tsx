const Game = ({appid,name,playtime_forever,owner = ''}: {appid: number; name: string; playtime_forever: number; owner?: string}) => {
    return (
        <div className="game">
        <p>{name} (appid: {appid})  {owner ? <span className="owner">Owner: {owner}</span> : ""}</p>
        <p>Playtime: {(playtime_forever / 60).toFixed(2)} hours</p>
        </div>
    )
}
export default Game;