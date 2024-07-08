import React from 'react';

export function Transfer_btn(props) {
  return (
      <button className="bg-green-500 text-white p-1.5 rounded text-center cursor-pointer mb-2 w-full" type="submit" >{props.redirect}</button>
  );
}
