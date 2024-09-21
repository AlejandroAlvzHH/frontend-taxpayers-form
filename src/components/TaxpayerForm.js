import React, {useState, useEffect} from "react";

const TaxpayerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    rfc: "",
    address: "",
  });

  const [taxpayers, setTaxpayers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [message, setMessage] = useState({text: "", type: ""});

  useEffect(() => {
    fetch("https://ynhumjrgo3.execute-api.us-east-1.amazonaws.com/v1/taxpayers")
      .then((response) => response.json())
      .then((data) => setTaxpayers(data.data));
  }, []);

  const handleChange = ({target: {name, value}}) => {
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://ynhumjrgo3.execute-api.us-east-1.amazonaws.com/v1/taxpayers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add taxpayer.");
      }

      const data = await response.json();
      setTaxpayers((prev) => [...prev, data]);
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        rfc: "",
        address: "",
      });
      setMessage({text: "Successfully added.", type: "success"});
      setShowAddCard(false);
    } catch (error) {
      setMessage({
        text: `Error adding taxpayer: ${error.message}`,
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setMessage({text: "", type: ""});
      }, 3000);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        {message.text ? (
          <div
            className={`p-4 mb-4 text-white ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        ) : (
          <h3 className="text-xl text-[#0B2B5B] mb-8">Taxpayer form</h3>
        )}
      </div>
      <div className="max-w-4xl mx-auto mt-8">
        <div className="grid grid-cols-1 gap-4">
          {taxpayers.map((taxpayer, index) => (
            <div
              key={taxpayer.id}
              className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg mb-6 relative"
            >
              <div className="relative flex items-center border-b border-gray-300 h-16">
                <div className="bg-[#0E508C] text-white px-3 py-2 rounded-tl-lg rounded-bl-none rounded-br-none rounded-tr-none flex items-center justify-center h-full w-16">
                  {index + 1}
                </div>
                <p className="text-lg font-semibold text-[#146DBF] ml-4 mt-1">
                  {taxpayer.name}
                </p>
                <button
                  className="absolute right-4 top-4 text-gray-500 cursor-pointer"
                  onClick={() => toggleExpand(taxpayer.id)}
                  aria-label={expanded === taxpayer.id ? "Collapse" : "Expand"}
                >
                  {expanded === taxpayer.id ? "▲" : "▼"}
                </button>
              </div>
              <div
                className={`p-6 ${
                  expanded === taxpayer.id ? "block" : "hidden"
                }`}
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                      Name
                    </label>
                    <input
                      type="text"
                      value={taxpayer.name}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      value={taxpayer.email}
                      className="block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                      Phone number
                    </label>
                    <input
                      type="text"
                      value={taxpayer.phone_number}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                      RFC
                    </label>
                    <input
                      type="text"
                      value={taxpayer.rfc}
                      className="block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                    Address
                  </label>
                  <input
                    type="text"
                    value={taxpayer.address}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddCard && (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg mb-6 relative">
          <div className="relative flex items-center border-b border-gray-300 h-16">
            <div className="bg-[#146DBF] text-white px-3 py-2 rounded-tl-lg rounded-bl-none rounded-br-none rounded-tr-none flex items-center justify-center h-full w-16">
              {taxpayers.length + 1}
            </div>
            <p className="text-lg font-semibold text-[#146DBF] ml-4 mt-1">
              New taxpayer
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jhon Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="jhon@doe.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="1234567890"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                  RFC
                </label>
                <input
                  type="text"
                  name="rfc"
                  placeholder="XAXX010101000"
                  value={formData.rfc}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#374151] mb-1 text-left">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#FF9900] text-white px-4 py-2 rounded-md hover:bg-[#e68a00]"
              >
                Add taxpayer
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="flex justify-center">
        <button
          className="text-[#146DBF] underline font-semibold hover:text-[#0B2B5B] mb-4"
          onClick={() => setShowAddCard(!showAddCard)}
        >
          + Add another taxpayer
        </button>
      </div>
    </div>
  );
};

export default TaxpayerForm;
