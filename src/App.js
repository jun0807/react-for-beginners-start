import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [buyable, setBuyable] = useState(0);

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setSelected(json[0].quotes.USD.price);
        setSelectedUnit(json[0].symbol);
      });
  }, []);

  const handleSelect = (event) => {
    const selectedValues = event.target.value.split(',');
    setSelected(selectedValues[0]);
    setSelectedUnit(selectedValues[1]);
  };

  const handleInput = (event) => {
    setBuyable(event.target.value / selected);
  };

  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handleSelect}>
          {coins.map((coin) => (
            <option key={coin.id} value={[coin.quotes.USD.price, coin.symbol]}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      Budgets: <input onChange={handleInput}></input> USD
      <br />
      Buyable: <span>{buyable}</span> {selectedUnit}
      <br />
    </div>
  );
}

export default App;
