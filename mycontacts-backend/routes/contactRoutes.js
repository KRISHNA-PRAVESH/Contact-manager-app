const express = require("express");
const router = express.Router();
const {getContacts,
       createContacts,
       getContact ,
      updateContact,
      deleteContact} = require("../controllers/contactController")
router.route("/").get(getContacts);

router.route("/").post(createContacts);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

router.route("/:id").get(getContact);
 
module.exports = router;