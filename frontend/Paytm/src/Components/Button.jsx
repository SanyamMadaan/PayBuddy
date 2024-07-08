import React from 'react';

export function Button(props) {
  return (
      <button className="bg-black text-white p-1.5 rounded text-center cursor-pointer mb-2 w-full" type="submit" >{props.redirect}</button>
  );
}
