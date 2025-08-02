import { useState, useEffect } from "react";
import { METALS } from "../constants/metals";
import {
  addPurity,
  getPurities,
  updatePurity,
  deletePurity,
} from "../services/purityService.js";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Spinner from "../components/Spinner.jsx";
import toast from "react-hot-toast";

const PurityPage = () => {
  const [metal, setMetal] = useState("");
  const [purity, setPurity] = useState("");
  const [purities, setPurities] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPurities();
      setPurities(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { metal, purity };

    try {
      if (editId) {
        await updatePurity(editId, data);
        toast.success("Updated Successfully");
        setEditId(null);
      } else {
        await addPurity(data);
        toast.success("Added Successfully");
      }

      setMetal("");
      setPurity("");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  const handleEdit = (item) => {
    setMetal(item.metal);
    setPurity(item.purity);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this purity?"
    );
    if (!confirm) return;
    try {
      await deletePurity(id);
      toast.success("Deleted Successfully");
      fetchData();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="bg-amber-50">
      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-3xl mx-auto py-10">
          <h2 className="text-2xl font-bold text-center mb-10">
            Purity Mangement
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white rounded shadow p-4"
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
                  <option key={m} value={m} className=" hover:bg-amber-100 ">
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
                className="w-full border p-2 rounded shadow outline-1 outline-amber-200"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="outline-1 outline-amber-200 bg-gray-600 text-white px-4 py-2 rounded shadow hover:cursor-pointer w-3/4 font-semibold"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
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
                  <div className="space-x-4">
                    <button
                      className="text-sm text-yellow-600 hover:cursor-pointer hover:text-lg transition-all"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-sm text-red-700 hover:cursor-pointer hover:text-lg transition-all"
                      onClick={() => handleDelete(item._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurityPage;
