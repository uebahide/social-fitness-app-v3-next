import React from 'react';

export default function Main({ children }: { children: React.ReactNode }) {
  return <div className="max-h-screen overflow-y-auto bg-gray-100 p-10">{children}</div>;
}
