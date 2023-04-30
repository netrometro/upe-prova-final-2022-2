import { useState } from "react";

export default function WeaponsGenshin() {
  const [weapons, setWeapons] = useState([]);

  const handleAddWeapon = (weapon) => {
    setWeapons([...weapons, weapon]);
  };

  return (
    <>
      <h1>Armas do Genshin</h1>
      <WeaponForm onAddWeapon={handleAddWeapon} />
      <WeaponList weapons={weapons} />
    </>
  );
}

function WeaponForm({ onAddWeapon }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [atk, setAtk] = useState("");
  const [weaponT5, setWeaponT5] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newWeapon = { name, description, atk, weaponT5 };
    onAddWeapon(newWeapon);
    setName("");
    setDescription("");
    setAtk("");
    setWeaponT5(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicione aqui suas armas do Genshin!</h2>
      <h3>Que a grande Baal lhe guie, juntos pela eternidade.</h3>
      <div>
        <label htmlFor="name">Nome da arma:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
        <br />
      <div>
        <label htmlFor="atk">Ataque base:</label>
        <input
          id="atk"
          type="number"
          value={atk}
          onChange={(event) => setAtk(event.target.value)}
        />
      </div>
        <br />
      <div>
        <label htmlFor="weaponT5">Arma T5?:</label>
        <input
          id="weaponT5"
          type="checkbox"
          checked={weaponT5}
          onChange={(event) => setWeaponT5(event.target.checked)}
        />
      </div>
        <br />
      <button type="submit">Salvar</button>
    </form>
  );
}

function WeaponList({ weapons }) {
  return (
    <>
      <h2>Lista das armas</h2>
      {weapons.length === 0 ? (
        <p>Nenhuma arma adicionada.</p>
      ) : (
        <ul>
          {weapons.map((weapon, index) => (
            <li key={index}>
              <h3>Nome: {weapon.name}</h3>
              <p>Descrição: {weapon.description}</p>
              <p>Ataque base: {weapon.atk}</p>
              <p>Arma T5: {weapon.weaponT5 ? "Sim" : "Não"}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
