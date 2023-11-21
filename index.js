const contacts = require('./contacts'); 
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        contacts.listContacts().then((result) => console.log(result));
      break;

    case 'get':
        contacts.getContactById(id).then((result) => console.log(result));
      break;

    case 'add':
        contacts.addContact(name, email, phone).then((result) => console.log(result));
      break;

    case 'remove':
        contacts.removeContact(id).then((result) => console.log(result));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// async function testContacts() {
   
//     console.log('List of contacts:');
//     const allContacts = await contacts.listContacts();
//     console.log(allContacts);
  
 
//     console.log('Adding a new contact:');
//     const newContact = await contacts.addContact('John Doe', 'john@example.com', '123-456-7890');
//     console.log('New contact:', newContact);
  
    
//     console.log('Getting contact by ID:');
//     const contactById = await contacts.getContactById(newContact.id);
//     console.log(contactById);
  
 
//     console.log('Removing contact by ID:');
//     const removedContact = await contacts.removeContact(newContact.id);
//     console.log('Removed contact:', removedContact);
  
  
//     console.log('List of contacts after removal:');
//     const updatedContacts = await contacts.listContacts();
//     console.log(updatedContacts);
//   }
  

//   testContacts();