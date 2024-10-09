import React from "react";
import { useFormStatus } from "react-dom";

export const FormSubmitButtonComponent = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-[120px] min-h-[30px] p-2 rounded-lg bg-slate-300 text-white text-[0.85rem] hover:shadow-md hover:bg-green-600 disabled:pointer-events-none disabled:bg-slate-100"
      disabled={pending}
    >
      OK
    </button>
  );
};
