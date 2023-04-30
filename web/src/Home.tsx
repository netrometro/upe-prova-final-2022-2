import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <p>HomePage</p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Link to={"/escola"}>Escolas</Link>
        <Link to={"/filmes"}>Filmes</Link>
        <Link to={"/escola"}>Escolas</Link>
        <Link to={"/dragQueens"}>Drag Queens</Link>
      </div>
    </>
  );
}
