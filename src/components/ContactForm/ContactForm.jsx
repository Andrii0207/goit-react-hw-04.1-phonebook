import { nanoid } from 'nanoid';
import { useState } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactId = nanoid();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = event.currentTarget;

    console.log(event.currentTarget.name.value);
    console.log(event.currentTarget.number.value);

    onSubmit(name.value, number.value);
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contactFormWrapper} onSubmit={handleSubmit}>
      <div className={css.inputDataWrapper}>
        <label className={css.labelName} htmlFor={contactId}>
          <p className={css.inputName}>Name</p>
          <input
            onChange={handleChange}
            value={name}
            className={css.inputData}
            type="text"
            name="name"
            id={contactId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="">
          <p className={css.inputName}>Number</p>
          <input
            onChange={handleChange}
            value={number}
            className={css.inputData}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <button className={css.addContactBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

// ===========================================================

// import { nanoid } from 'nanoid';
// import { Component } from 'react';
// import css from './ContactForm.module.css';

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   contactId = nanoid();

//   handleChange = event => {
//     const { name, value } = event.currentTarget;

//     this.setState({ [name]: value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit(this.state);
//     this.resetForm();
//   };

//   resetForm = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   render() {
//     return (
//       <form className={css.contactFormWrapper} onSubmit={this.handleSubmit}>
//         <div className={css.inputDataWrapper}>
//           <label className={css.labelName} htmlFor={this.contactId}>
//             <p className={css.inputName}>Name</p>
//             <input
//               onChange={this.handleChange}
//               value={this.state.name}
//               className={css.inputData}
//               type="text"
//               name="name"
//               id={this.contactId}
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//             />
//           </label>
//           <label htmlFor="">
//             <p className={css.inputName}>Number</p>
//             <input
//               onChange={this.handleChange}
//               value={this.state.number}
//               className={css.inputData}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//             />
//           </label>
//         </div>
//         <button className={css.addContactBtn} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

// export default ContactForm;
