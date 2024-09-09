import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Transfer_btn({label,onClick}) {
  const navigate=useNavigate();
  return (
      <button onClick={onClick} className="bg-green-500 text-white p-1.5 rounded text-center cursor-pointer mb-2 w-full" type="submit" >{label}</button>
  );
}
