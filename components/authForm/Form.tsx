import React from 'react';

export const AuthForm = ({
  title,
  footerText,
  action,
  children,
}: {
  title?: string;
  footerText?: string | React.ReactNode;
  action: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
}) => {
  return (
    <form action={action} className="w-[500px] space-y-5 rounded-lg px-15 py-3 shadow-lg">
      <div className="text-center text-2xl">
        <p>{title}</p>
      </div>

      {children}

      <div className="mb-3 text-center">{footerText}</div>
    </form>
  );
};
