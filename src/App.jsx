import { useState, useEffect } from "react";

const App = () => {
  const [totalGifts, setTotalGifts] = useState("");
  const [level, setLevel] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let currentTotal = Number(totalGifts);
    let currentLevel = Number(level);
    let results = [];

    while (currentTotal > 0) {
      let base = 50 * (currentLevel - 4);
      let prot = Math.floor(currentTotal * 0.1) + base;
      let newTotalGifts = currentTotal - prot;

      results.push({
        level: currentLevel,
        prot,
        totalGifts: newTotalGifts,
      });

      currentTotal = newTotalGifts;
      currentLevel += 1;
    }

    setData(results);
  };

  return (
    <div className="flex flex-col justify-center items-center my-5">
      <p className="text-3xl font-semibold">How many protections do I have left?</p>

      <p className="text-sm font-bold max-w-xs mt-5 text-center">
        NOTE: This calculator assumes that you use nothing except the Altar of Protection and doesn't account for any
        other gift gain/loss, which means it will not entirely be accurate, but it gives you a good estimate.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center my-5">
        <input
          type="number"
          placeholder="Total Gifts"
          value={totalGifts}
          min="1"
          onChange={(e) => setTotalGifts(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))}
          required
          className="border p-2 rounded w-64 mb-3"
        />

        <input
          type="number"
          placeholder="Level"
          value={level}
          min="1"
          onChange={(e) => setLevel(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))}
          required
          className="border p-2 rounded w-64 mb-4"
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-2 rounded">
          Calculate
        </button>
      </form>

      {data.length > 0 && <p className="font-lg font-bold">Protections left: {data.length - 1}</p>}

      {data.slice(0, -1).map((item, index) => (
        <div
          key={index}
          className="flex flex-wrap border-none rounded-sm p-5 my-2 
             bg-gradient-to-b from-cyan-300 to-sky-500"
        >
          <p>
            Level: {item.level} <br /> Protection Cost: {item.prot} <br /> Gifts Left: {item.totalGifts}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
