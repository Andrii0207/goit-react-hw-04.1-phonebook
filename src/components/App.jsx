import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));
    return (
      contactsLocalStorage ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterInputHandler = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  console.log('contacts', contacts);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    return contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${name} is already in contacts`)
      : setContacts(() => [newContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredList = filterContacts();

  return (
    <section>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
      </div>
      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={filterInputHandler} />
        <ContactList contacts={filteredList} onDeleteContact={deleteContact} />
      </div>
    </section>
  );
};

// =========================================

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   filterInputHandler = event => {
//     const { value } = event.currentTarget;

//     this.setState({ filter: value });
//   };

//   filterContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact => {
//       return contact.name.toLowerCase().includes(normalizedFilter);
//     });
//   };

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;

//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     contacts.find(
//       contact => newContact.name.toLowerCase() === contact.name.toLowerCase()
//     )
//       ? alert(`${name} is already in contacts`)
//       : this.setState(({ contacts }) => ({
//           contacts: [newContact, ...contacts],
//         }));
//   };

//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredList = this.filterContacts();

//     return (
//       <section>
//         <div>
//           <h1>Phonebook</h1>
//           <ContactForm onSubmit={this.addContact} />
//         </div>
//         <div>
//           <h2>Contacts</h2>
//           <Filter value={filter} onChange={this.filterInputHandler} />
//           <ContactList
//             contacts={filteredList}
//             onDeleteContact={this.deleteContact}
//           />
//         </div>
//       </section>
//     );
//   }
// }
