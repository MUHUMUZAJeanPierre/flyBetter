import ContactShema from "../models/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new ContactShema({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Contact created successfully", data: newContact, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error: error.message });
    console.log(error);
  }
};

export const listContact = async (req, res) => {
  try {
    const contacts = await ContactShema.find({});
    res.status(200).json({ message: "Contacts successfully retrieved", data: contacts, success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve contacts", error: error.message });
    console.log(error);
  }
};

export const deleteContact = async(req, res) => {
    try {
        const {id} = req.params
        const contact = await ContactShema.findByIdAndDelete(id, req.body);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }else{
            return res.status(200).json({ message: "Contact deleted successfully", data: contact, success: true });
        }
    } catch (error) {
        res.status(error.status).json({ message:"Error while deleting contact", error: error });
        console.log(error);
    }
}