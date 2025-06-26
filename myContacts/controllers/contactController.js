const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// 전체 연락처 조회 - GET /contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.render("index", { contacts: contacts });
});

// 연락처 추가 폼 보기 - GET /contacts/add
const addContactForm = (req, res) => {
  res.render("add");
};

// 새 연락처 생성 - POST /contacts
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send("필수값이 입력되지 않았습니다.");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).send("Create Contacts");
});

// 특정 연락처 조회 - GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update", { contact: contact });
});

// 연락처 수정 - PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Error("Contact not found");
  }

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  contact.save();

  res.redirect("/contacts");
});

// 연락처 삭제 - DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/contacts");
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
};
