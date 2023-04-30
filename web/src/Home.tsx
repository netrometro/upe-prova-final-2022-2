import { Link } from "react-router-dom";

export default function Home() {

    return (
       <>
         <p>HomePage</p>
         <Link to={"/escola"}>Escolas</Link>
         <br/>
         <Link to={"/dragQueens"}>Drag Queens</Link>
         <br/>
         <Link to={"/animals"}>Animals</Link>
       </>
    );
  }