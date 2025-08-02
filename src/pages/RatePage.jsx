import { useState, useEffect } from "react";
import { METALS } from "../constants/metals";
import { getPurities } from "../services/purityService";
import { addRate, getRates, getLatestRate } from "../services/rateService";

const RatePage = () => {
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [rate, setRate] = useState("");
  const [rateDate, setRateDate] = useState("");
  const [latestRate, setLatestRate] = useState(null);
  const [purityOptions, setPurityOptions] = useState([]);
  const [rateHistory, setRateHistory] = useState([]);

  useEffect(() => {
    getPurities().then((res) => {
      setPurityOptions(res.data);
    });
    getRates().then((res) => {
      setRateHistory(res.data);
    });
  }, []);

  const handleMetalPurityChange = async (m, p) => {
    if (m && p) {
      try {
        const res = await getLatestRate(m, p);
        setLatestRate(res.data);
      } catch {
        setLatestRate(null);
      }
    }
  };

  useEffect(() => {
    if (metal && purity) {
      handleMetalPurityChange(metal, purity);
    }
  }, [metal, purity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { metal, purity, rate: Number(rate), date: rateDate };
    await addRate(data);

    setRate("");
    setRateDate("");
    setLatestRate(null);

    getRates().then((res) => setRateHistory(res.data));
  };

  return (
    <div className="max-3xl mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-6">
        Metal Rate Management
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <div>
            <label className="block mb-1 font-medium">Metal</label>
            <select
              value={metal}
              onChange={(e) => setMetal(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Metal</option>
              {METALS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Select Purity</label>
            <select
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              {purityOptions
                .filter((p) => p.metal === metal)
                .map((p) => (
                  <option key={p._id} value={p.purity}>
                    {p.purity}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {latestRate && (
          <div>
            Latest Rate for {metal} - {purity}: ₹{latestRate.rate} on{" "}
            {new Date(latestRate.date).toLocaleDateString()}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">New Rate (₹)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Rate Date</label>
            <input
              type="date"
              value={rateDate}
              onChange={(e) => setRateDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-400 text-white rounded py-2 px-4"
        >
          Add Rate
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Rate History</h2>
        <ul className="divide-y bg-white rounded shadow">
          {rateHistory.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center py-2 px-4"
            >
              <span>
                {item.metal} - {item.purity} → ₹{item.rate} on{" "}
                {new Date(item.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RatePage;
