import { useState, useEffect } from "react";
import { METALS } from "../constants/metals";
import { getPurities } from "../services/purityService";
import { addRate, getRates, getLatestRate } from "../services/rateService";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";


const RatePage = () => {
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [rate, setRate] = useState("");
  const [rateDate, setRateDate] = useState("");
  const [latestRate, setLatestRate] = useState(null);
  const [purityOptions, setPurityOptions] = useState([]);
  const [rateHistory, setRateHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterMetal, setFilterMetal] = useState("");
  const [filterPurity, setFilterPurity] = useState("");

  // Load all purities and rates
  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const [purityRes, rateRes] = await Promise.all([getPurities(), getRates()]);
      setPurityOptions(purityRes?.data || []);
      setRateHistory(rateRes?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // Refetch filtered rates
  useEffect(() => {
    const fetchFilteredRates = async () => {
      setLoading(true);
      try {
        const res = await getRates({
          metal: filterMetal,
          purity: filterPurity,
        });
        setRateHistory(Array.isArray(res) ? res : []);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredRates();
  }, [filterMetal, filterPurity]);

  // Fetch latest rate when metal or purity changes
  useEffect(() => {
    if (metal && purity) {
      const fetchLatest = async () => {
        try {
          const res = await getLatestRate(metal, purity);
          setLatestRate(res);
        } catch {
          setLatestRate(null);
        }
      };
      fetchLatest();
    }
  }, [metal, purity]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { metal, purity, rate: Number(rate), date: rateDate };
    try {
      await addRate(data);
      setMetal("");
      setPurity("");
      setRate("");
      setRateDate("");
      setLatestRate(null);
      toast.success("Added Successfully");
      const res = await getRates({
        metal: filterMetal,
        purity: filterPurity,
      });
      setRateHistory(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-3xl mx-auto p-4">
          <h2 className="text-2xl text-center font-bold mb-4">
            Metal Rate Management
          </h2>

          {/* Rate Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 rounded shadow"
          >
            <div>
              <label className="block mb-1 font-medium">Metal</label>
              <select
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                className="w-full border p-2 rounded outline-1 outline-amber-200"
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
                className="w-full p-2 border rounded outline-1 outline-amber-200"
                required
              >
                <option value="">Select Purity</option>
                {[
                  ...new Set(
                    purityOptions
                      .filter(
                        (p) => p.metal.toLowerCase() === metal.toLowerCase()
                      )
                      .map((p) => p.purity)
                  ),
                ].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {latestRate && (
              <div className="text-sm text-gray-700">
                Latest Rate for <strong>{metal}</strong> -{" "}
                <strong>{purity}</strong>: ₹{latestRate.rate} on{" "}
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
                  className="w-full p-2 border rounded outline-1 outline-amber-200 "
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Rate Date</label>
                <input
                  type="date"
                  value={rateDate}
                  onChange={(e) => setRateDate(e.target.value)}
                  className="w-full border p-2 rounded outline-1 outline-amber-200"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-gray-600 shadow outline-1 outline-amber-200 text-white rounded py-2 px-4 hover:cursor-pointer"
            >
              Add Rate
            </button>
          </form>

          {/* Filter UI */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Rate History</h2>
            <div className="flex gap-4 items-end mb-6">
              <div className="w-1/2">
                <label className="block mb-1 font-medium">
                  Filter by Metal
                </label>
                <select
                  value={filterMetal}
                  onChange={(e) => setFilterMetal(e.target.value)}
                  className="w-full border p-2 rounded outline-1 outline-amber-200"
                >
                  <option value="">All Metals</option>
                  {METALS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label className="block mb-1 font-medium">
                  Filter by Purity
                </label>
                <select
                  value={filterPurity}
                  onChange={(e) => setFilterPurity(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">All Purities</option>
                  {[
                    ...new Set(
                      purityOptions
                        .filter(
                          (p) =>
                            !filterMetal ||
                            p.metal.toLowerCase() === filterMetal.toLowerCase()
                        )
                        .map((p) => p.purity)
                    ),
                  ].map((purity) => (
                    <option key={purity} value={purity}>
                      {purity}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setFilterMetal("");
                setFilterPurity("");
              }}
              className="bg-gray-300 px-4 py-2 rounded mb-4 hover:cursor-pointer"
            >
              Clear Filters
            </button>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white rounded shadow text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2">Metal</th>
                    <th className="text-left px-4 py-2">Purity</th>
                    <th className="text-left px-4 py-2">Rate (₹)</th>
                    <th className="text-left px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rateHistory.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="px-4 py-2">{item.metal}</td>
                      <td className="px-4 py-2">{item.purity}</td>
                      <td className="px-4 py-2">₹{item.rate}</td>
                      <td className="px-4 py-2">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatePage;
