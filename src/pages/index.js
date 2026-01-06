
import { useState, useEffect } from "react";

function shuffle(a){return [...a].sort(()=>Math.random()-0.5);}

export default function App(){
  const [players,setPlayers]=useState([]);
  const [tables,setTables]=useState([]);
  const [tv,setTv]=useState(false);

  const addPlayer=(name)=>{
    if(!name) return;
    setPlayers([...players,{id:crypto.randomUUID(),name,points:0,wins:0}]);
  };

  const generate=()=>{
    const s=shuffle(players);
    const t=[];
    for(let i=0;i+3<s.length;i+=4){
      t.push({id:t.length+1,players:s.slice(i,i+4)});
    }
    setTables(t);
  };

  if(tv){
    return (
      <div style={{padding:40,fontSize:28}}>
        <h1>Leaderboard</h1>
        {players.sort((a,b)=>b.points-a.points).map(p=>(
          <div key={p.id}>{p.name} — {p.points}</div>
        ))}
        <button onClick={()=>setTv(false)}>Exit TV Mode</button>
      </div>
    );
  }

  return (
    <div style={{padding:20}}>
      <h1>Euchre Tournament</h1>
      <input placeholder="Add player" onKeyDown={e=>{
        if(e.key==="Enter"){addPlayer(e.target.value);e.target.value=""}
      }}/>
      <button onClick={generate}>Generate Tables</button>
      <button onClick={()=>window.print()}>Print Seating (PDF)</button>
      <button onClick={()=>setTv(true)}>TV Mode</button>
      {tables.map(t=>(
        <div key={t.id}>
          <h3>Table {t.id}</h3>
          {t.players.map(p=>p.name).join(" / ")}
        </div>
      ))}
    </div>
  );
}
