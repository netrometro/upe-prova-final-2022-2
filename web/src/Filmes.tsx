export default function Filmes() {
  return (
    <>
      <div
        style={{
          maxWidth: "500px",
          margin: "10vh auto",
          padding: "24px",
          borderRadius: "5px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1>font-weight</h1>
        <p style={{ fontWeight: 700 }}>
          Lorem ipsum dolor sit amet,{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore
          </span>{" "}
          et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit.
        </p>
        <h1>GRAD</h1>
        <p style={{ fontVariationSettings: "'GRAD' 150" }}>
          Lorem ipsum dolor sit amet,{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore
          </span>{" "}
          et dolore magna aliqua. Sed enim ut sem viverra aliquet eget sit.
        </p>
      </div>

      <a
        style={{
          position: "fixed",
          zIndex: 10,
          bottom: "20px",
          left: "50%",
          color: "#fff",
          transform: "translateX(-50%)",
          fontWeight: 700,
          opacity: 0.5,
        }}
        href="https://github.com/Jonas-eng-21"
        target="_blank"
      >
        Pen by Jonas Soares
      </a>
    </>
  );
}
