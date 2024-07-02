import { useEffect, useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [usd, setUsd] = useState(0);
  const select = (event) => {
    setUsd(event.target.value);
  };
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      <input
        onChange={onChange}
        type='number'
        value={money}
        placeholder='write your money'
      />
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <select onChange={select} value={coin.quotes.USD.price}>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      {money > 0 ? `${usd}` : null}
    </div>
  );
}

export default App;
