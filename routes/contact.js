const { Router } = require('express');
const fs = require('fs');
const contactList = './config/contact_list.json';
const router = Router();

// Read data from JSON file
const readData = () => {
    const data = fs.readFileSync(contactList);
    return JSON.parse(data);
  };
  
// Write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(contactList, JSON.stringify(data, null, 2));
};

// Get all contacts
router.get('/', (req, res) => {
    const data = readData();
    res.status(200).json({
        status: 200,
        data: data
    });
});
  
// Get contact by ID
router.get('/:param', (req, res) => {
    const data = readData();
    const param = req.params.param;
    let contacts = [];
  
    if (!isNaN(param)) {
      // Search by numberPhone
      contacts = data.filter((item) => item.numberPhone === param);
    } else {
      // Search by firstName or lastName
      contacts = data.filter(
        (item) =>
        item.firstName.toLowerCase() === param.toLowerCase() ||
        item.lastName.toLowerCase() === param.toLowerCase()
      );
    }
  
    if (contacts.length > 0) {
        res.status(200).json({
            status: 200,
            data: contacts
        });
    } else {
    res.status(400).json({
        status: 400,
        message: 'No contacts found'
      });
    }
  });
  
// Create a new contact
router.post('/', (req, res) => {
    const data = readData();
    const { firstName, lastName, numberPhone, address } = req.body;
    if (firstName && lastName && numberPhone && address) {
      const existingContact = data.find(contact => contact.numberPhone === numberPhone);
      if (existingContact) {
        res.status(409).json({
            status: 409,
            message: 'Contact with the same number already exists'
          });
      } else {
        const newContact = {
          firstName,
          lastName,
          numberPhone,
          address
        };
        data.push(newContact);
        writeData(data);
        res.status(201).json({
            status: 201,
            message: 'New contact added',
            data: newContact
          });
      }
    } else {
        res.status(400).json({
            status: 400,
            message: 'Incomplete contact information',
        });
    }
});
  
// Update a contact by numberPhone
router.put('/:numberPhone', (req, res) => {
    const data = readData();
    const { firstName, lastName, address, numberPhone } = req.body;
    const reqNumberPhone = req.params.numberPhone;
    if (numberPhone) {
        const existingNumber = data.find(contact => contact.numberPhone === numberPhone);
        if (existingNumber) {
          res.status(409).json({
              status: 409,
              message: 'Contact with the same number already exists, please either delete the "numberPhone" or make a change on the "numberPhone" in request body'
            });
        }
    } else { 
        const index = data.findIndex((contact) => contact.numberPhone === reqNumberPhone);
        if (index !== -1) {
            data[index].firstName = firstName || data[index].firstName;
            data[index].lastName = lastName || data[index].lastName;
            data[index].address = address || data[index].address;
            data[index].numberPhone = numberPhone || data[index].numberPhone;
            writeData(data);
            res.status(200).json({
                status: 200,
                message: 'Changes have been made',
                data: data[index]
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'Contact not found'
            });
        }
    }  
});
  
// Delete a contact by numberPhone
router.delete('/:numberPhone', (req, res) => {
    const data = readData();
    const numberPhone = req.params.numberPhone;
    const index = data.findIndex((contact) => contact.numberPhone === numberPhone);
    if (index !== -1) {
        const deletedContact = data[index];
        data.splice(index, 1);
        writeData(data);
        res.status(200).json({
            status: 200,
            message: 'Contact has been deleted'
        });
    } else {
        res.status(404).json({
            status: 404,
            message: 'Contact not found'
        });
    }
});


module.exports = router;