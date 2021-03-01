import React from 'react';
import classNames from 'classnames';

const Toggle = ({ clickHandler, text, icon, active, large }) => {
  const buttonClass = classNames({
    buttonToggle: true,
    noIcon: !icon,
    active,
    large,
  });

  return (
    <button className={`isoControlBtn ${buttonClass}`} onClick={clickHandler}>
      {icon}
      {text}
    </button>
  );
};

export default Toggle;
