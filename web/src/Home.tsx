import { Link } from "react-router-dom";

export default function Home() {

    return (
       <>
         <p>HomePage</p>
         <Link to={"/WeaponsGenshin"}>Armas do Genshin</Link>
       </>
    );
  }