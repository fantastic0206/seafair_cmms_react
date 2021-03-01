import React from 'react';
import IntlMessages from '../utility/intlMessages';
import { InputSearch } from '../uielements/input';
import DeleteButton from './DeleteButton';
import { ContactListWrapper } from './ContactList.style';
import Scrollbar from '../utility/customScrollBar';
import { useIntl } from 'react-intl';

function filterContacts(contacts, search) {
  search = search.toUpperCase();
  return search
    ? contacts.filter((contact) => contact.name.toUpperCase().includes(search))
    : contacts;
}

export default function ContactList(props) {
  const intl = useIntl();
  const [search, setSearch] = React.useState('');
  function singleContact(contact) {
    const { selectedId, deleteContact, changeContact } = props;
    const activeClass = selectedId === contact.id ? 'active' : '';
    const onChange = () => changeContact(contact.id);
    return (
      <div
        key={contact.id}
        className={`${activeClass} isoSingleContact`}
        onClick={onChange}
      >
        <div className="isoAvatar">
          {contact.avatar ? <img alt="#" src={contact.avatar} /> : ''}
        </div>
        <div className="isoContactName">
          <h3>{contact.name ? contact.name : 'No Name'}</h3>
        </div>
        <DeleteButton deleteContact={deleteContact} contact={contact} />
      </div>
    );
  }
  function onChange(event) {
    setSearch(event.target.value);
  }

  const contacts = filterContacts(props.contacts, search);
  return (
    <ContactListWrapper className="isoContactListWrapper">
      <InputSearch
        placeholder={intl.formatMessage({
          id: 'contactlist.searchContacts',
        })}
        value={search}
        onChange={onChange}
        className="isoSearchBar"
      />
      {contacts && contacts.length > 0 ? (
        <div className="isoContactList">
          <Scrollbar
            className="contactListScrollbar"
            style={{ height: 'calc(100vh - 200px)' }}
          >
            {contacts.map((contact) => singleContact(contact))}
          </Scrollbar>
        </div>
      ) : (
        <span className="isoNoResultMsg">
          {<IntlMessages id="Component.contacts.noOption" />}
        </span>
      )}
    </ContactListWrapper>
  );
}
