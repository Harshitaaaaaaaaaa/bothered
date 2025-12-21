import { useEffect, useState } from "react";
import axios from "axios";

function ContactFriend({ user, onBack }) {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  /* FETCH CONTACTS */
  const fetchContacts = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/contacts/${user._id}`
    );
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* ADD CONTACT */
  const addContact = async () => {
    if (!name || !phone) {
      alert("Please enter name and phone");
      return;
    }

    await axios.post("http://localhost:5000/api/contacts", {
      userId: user._id,
      name,
      phone,
      relation,
    });

    setName("");
    setPhone("");
    setRelation("");
    fetchContacts();
  };

  /* DELETE CONTACT */
  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div className="min-h-screen bg-emerald-800 text-white px-6 py-10">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-4xl font-extrabold mb-2">
          👥 Contact a Friend
        </h1>
        <p className="text-white/80">
          Save people you trust. Reach out anytime 💚
        </p>
      </div>

      {/* ADD CONTACT */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow-xl mb-8">
        <h2 className="text-xl font-bold text-emerald-800 mb-4">
          ➕ Add Trusted Person
        </h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full mb-3 p-3 rounded border
            text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500
          "
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="
            w-full mb-3 p-3 rounded border
            text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500
          "
        />

        <input
          placeholder="Relation (friend / family)"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          className="
            w-full mb-4 p-3 rounded border
            text-black placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-emerald-500
          "
        />

        <button
          onClick={addContact}
          className="
            w-full bg-emerald-800 text-white
            py-3 rounded-xl font-semibold
            hover:bg-emerald-900 transition
          "
        >
          Save Contact
        </button>
      </div>

      {/* CONTACT LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {contacts.map((c) => (
          <div
            key={c._id}
            className="
              bg-white rounded-3xl p-5 shadow
              flex justify-between items-center
            "
          >
            <div>
              <h3 className="text-lg font-bold text-emerald-800">
                {c.name}
              </h3>
              <p className="text-sm text-emerald-700">
                {c.relation}
              </p>
              <p className="text-sm text-emerald-700">
                📞 {c.phone}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={`tel:${c.phone}`}
                className="
                  bg-emerald-800 text-white
                  px-4 py-2 rounded-full
                  hover:bg-emerald-900 transition
                "
              >
                Call
              </a>

              <button
                onClick={() => deleteContact(c._id)}
                className="
                  bg-red-500 text-white
                  px-3 py-2 rounded-full
                  hover:bg-red-600 transition
                "
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BACK */}
      <div className="text-center mt-10">
        <button
          onClick={onBack}
          className="underline text-white/80 hover:text-white"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default ContactFriend;
