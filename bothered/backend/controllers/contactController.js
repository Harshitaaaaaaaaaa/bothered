import Contact from "../models/Contact.js";

/* ADD CONTACT */
export const addContact = async (req, res) => {
  try {
    const { userId, name, phone, relation } = req.body;

    if (!userId || !name || !phone) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const contact = await Contact.create({
      user: userId,
      name,
      phone,
      relation,
    });

    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET USER CONTACTS */
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.params.userId });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE CONTACT */
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
