import { UEMAIL } from "@/utils/data";
import { hasNoLatinSymbols } from "@/utils/functions";
import { useState, useRef, forwardRef } from "react";

const MINLENGTH: number = 8;
const MAXLENGTH: number = 32;

export const EmailInputComponent = forwardRef((_, paramRef: any) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [strLength, setStrLength] = useState<number>(0);
  const [emailValue, setEmailValue] = useState<string>("");
  //const emailRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsActive(true);
  };
  const handleBlur = () => {
    setIsActive(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setStrLength(value.length);
    if (!hasNoLatinSymbols(value)) {
      setEmailValue(value);
    }
  };

  const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (paramRef.current) {
      paramRef.current.value = "";
      setStrLength(0);
      setEmailValue("");
    }
    paramRef.current?.focus();
  };

  return (
    <label className="flex flex-col relative" aria-labelledby="u-email">
      <span
        className={`text-[0.8rem] ${
          isActive ? "animate-bounce text-sky-800" : "text-inherit"
        }`}
      >
        Ваш email (обязательно):
      </span>
      <input
        ref={paramRef}
        type="email"
        name={UEMAIL}
        id={UEMAIL}
        required
        placeholder="temp@thesite.primer.com"
        minLength={MINLENGTH}
        maxLength={MAXLENGTH}
        value={emailValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className=" md:w-[70%] p-2 outline-none border-b border-b-slate-600 text-[0.85rem] bg-transparent focus:border-b-2 focus:border-b-slate-600 placeholder:text-[0.8rem] placeholder:text-slate-400 "
      />
      {strLength > 0 && (
        <button
          type="button"
          title="Очистить"
          onClick={handleClearClick}
          className="w-[16px] h-[14px] px-1 bg-slate-300 text-black text-[0.6rem] active:scale-90 absolute right-1 md:right-[30%] top-8"
          tabIndex={-1}
        >
          x
        </button>
      )}
      <span className="text-slate-500 text-[0.7rem]">
        {" "}
        {`Введено ${strLength} из (${MINLENGTH}-${MAXLENGTH}) `}
        {strLength >= MINLENGTH &&
        paramRef.current?.value.includes("@") &&
        paramRef.current?.value.includes(".") ? (
          <span className="text-[1rem]">📧</span>
        ) : null}
        <span>. Только латинские символы</span>
      </span>
    </label>
  );
});

export default EmailInputComponent;
