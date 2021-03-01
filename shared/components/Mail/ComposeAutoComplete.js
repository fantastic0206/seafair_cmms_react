import React from 'react';
import AutoComplete from './ComposeAutoComplete.style';
import { Mentions } from 'antd';

function createSuggestions(item) {
  if (item && item.length > 0) {
    return item.map((element) => ({
      id: `${element.id}`,
      value: `${element.email}`,
      text: `${element.name}<${element.email}>`,
    }));
  }
  return [];
}

export default function MentionsReceiver({ placeholder, autofocus, allMails }) {
  const [options] = React.useState(createSuggestions(allMails));
  function onChange(value) {
    console.log('Change:', value);
  }
  function onSelect(option) {
    console.log('select', option);
  }
  return (
    <AutoComplete>
      <Mentions
        style={{ width: '100%' }}
        onChange={onChange}
        onSelect={onSelect}
        placeholder={`${placeholder}: input @ to mention receiver`}
        autoFocus={autofocus ?? false}
      >
        {options.map(({ id, value, text }) => (
          <Mentions.Option key={id} value={value}>
            {text}
          </Mentions.Option>
        ))}
      </Mentions>
    </AutoComplete>
  );
}
