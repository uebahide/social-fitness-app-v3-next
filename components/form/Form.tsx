import React from "react";

export const Form = ({
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
    <form
      action={action}
      className="w-[500px] rounded-lg px-15 py-3 shadow-lg space-y-5"
    >
      <div className="text-center text-2xl">
        <p>{title}</p>
      </div>

      {children}

      <div className="text-center mb-3">{footerText}</div>
    </form>
  );
};
