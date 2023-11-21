// contacts.js
const fsPromises = require('fs').promises;
const path = require('path');

 
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
 

// TODO: задокументувати кожну функцію
async function listContacts() {
    try {
        const data =  await fsPromises.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
      } catch (error) {
        console.error('Error reading contacts file:', error);
        return [];
      }
  }
  
 async function getContactById(contactId) {
    try {
        const data =  await fsPromises.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const contact = contacts.find((c) => c.id === contactId);
        return contact || null;
      } catch (error) {
        console.error('Error reading contacts file:', error);
        return null;
      }
  }
  
  async function removeContact(contactId) {
    try {
        const data = await fsPromises.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const removedContact = contacts.find((c) => c.id === contactId);
        if (!removedContact) {
          return null;
        }
    
        const updatedContacts = contacts.filter((c) => c.id !== contactId);
        await fsPromises.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
    
        return removedContact;
      } catch (error) {
        console.error('Error reading or writing contacts file:', error);
        return null;
      }
  }
  
 async function addContact(name, email, phone) {
    try {
        const data = await fsPromises.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
    
        const newContact = {
          id: Date.now().toString(),
          name,
          email,
          phone,
        };
    
        const updatedContacts = [...contacts, newContact];
         fsPromises.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), 'utf-8');
    
        return newContact;
      } catch (error) {
        console.error('Error reading or writing contacts file:', error);
        return null;
      }  }

      module.exports = {
        listContacts,
        getContactById,
        removeContact,
        addContact,
      };