import { useState } from "react";
import { datasources } from "../constants/datasource";
import { api } from "../services/api";

const AddDocs = () => {
  const [datasource, setDatasource] = useState("");
  const [matchDatasources, setMatchDatasources] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSearchDatasource = (e) => {
    const input = e.target.value;
    setDatasource(input);
    setMatchDatasources(
        datasources.filter((item) =>
            item.toLowerCase().includes(input.toLowerCase())
        )
    );
  };

  const handleSelectDatasource = (item) => {
    setDatasource(item);
    setMatchDatasources([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!datasources.includes(datasource)) {
      setMessage({ type: 'error', text: "Vui lòng chọn các datasource được gợi ý" });
      return;
    }
    if (!file) {
      setMessage({ type: 'error', text: "Vui lòng chọn file" });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', datasource);

    try {
      const response = await api.post('add-file-to-embedding', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setMessage({ type: 'success', text: "File uploaded successfully!" });
        setFile(null);
        setDatasource('');
      } else {
        setMessage({ type: 'error', text: "Error uploading file. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: "An error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Add Docs</h1>
            <span>
            <a
                href="/"
                className="text-white bg-black px-4 py-2 rounded hover:bg-slate-400"
            >
              Chat
            </a>
          </span>
          </div>

          <div className="relative">
            <input
                type="text"
                onChange={handleSearchDatasource}
                value={datasource}
                placeholder="Search datasource"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            {matchDatasources.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto">
                  {matchDatasources.map((item) => (
                      <li
                          key={item}
                          onClick={() => handleSelectDatasource(item)}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {item}
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <input
              type="file"
              className="w-full p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleFileChange}
          />
          <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-400"
              disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
        {message.text && (
            <div className={`mt-4 p-2 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
        )}
      </div>
  );
};

export default AddDocs;