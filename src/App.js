import { useEffect, useState } from "react";

const App = () => {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState("");
  const [sets, setSets] = useState([]);
  const [set, setSet] = useState("Base");

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.pokemontcg.io/v2/sets");
      const { data } = await res.json();
      console.log(data);
      data.sort((a, b) => a.number - b.number);
      setSets(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=set.id:${set}`
      );
      const { data } = await res.json();
      console.log(data);
      //   data.sort((a, b) => a.)
      setCards(data);
    })();
  }, [set]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${set}`
    );
    const { data } = await res.json();
    console.log(data);
    setCards(data);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={set} onChange={(e) => setSet(e.target.value)}>
          {sets &&
            sets.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            ))}
        </select>
      </form>
      {cards &&
        cards.map((card) => (
          <img
            key={card.id}
            src={`${card.images.small}`}
            alt={`${card.name}`}
          ></img>
        ))}
    </div>
  );
};

export default App;
