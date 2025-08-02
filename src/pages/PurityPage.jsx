import { useState, useEffect } from "react";
import { METALS } from "../constants/metals";
import {
  addPurity,
  getPurities,
  updatePurity,
  deletePurity,
} from "../services/purityService.js";

const PurityPage = () => {
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [purities, setPurities] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await getPurities();
    setPurities(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { metal, purity };

    if (editId) {
      await updatePurity(editId, data);
      setEditId(null);
    } else {
      await addPurity(data);
    }

    setMetal("");
    setPurity("");
    fetchData();
  };

  const handleEdit = (item) => {
    setMetal(item.metal);
    setPurity(item.purity);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await deletePurity(id);
    fetchData();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Purity Mangement</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded shadow p-3"   
      >
        <div>
          <label htmlFor="" className="block mb-1 font-medium">
            Metal
          </label>
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
          <label className="block mb-1 font-medium">Purity</label>
          <input
            type="text"
            value={purity}
            onChange={(e) => setPurity(e.target.value)}
            className="w-full border p-2 rounded shadow"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Purity List</h3>
        <ul className="divide-y bg-white rounded shadow">
          {purities.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center px-4 py-2"
            >
              <span>
                {item.metal} - {item.purity}
              </span>
              <div className="space-x-2">
                <button
                  className="text-sm text-yellow-500"
                  onClick={()=>handleEdit(item)}
                >
                  Edit
                </button>
                <button className="text-sm text-red-500" onClick={()=>handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PurityPage;
