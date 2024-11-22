import { SVG_Eye, SVG_Eye_Closed } from "@/svg_components/eyes";
import { useState, useRef } from "react";

const MINLENGTH: number = 8;
const MAXLENGTH: number = 12;

export const AuthPasswordComponent = ({
  paramNameId,
}: {
  paramNameId: string;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currLength, setCurrLength] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    setIsActive(false);
  };
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleShowPass = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen((prev) => (prev = !prev));

    inputRef.current?.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrLength(event.currentTarget.value.length);
  };

  return (
    <label
      className="flex flex-col space-y-1 relative"
      aria-labelledby="u-pass"
    >
      <span
        className={`text-[0.8rem] ${
          isActive ? "animate-bounce text-sky-800" : "text-inherit"
        }`}
      >
        Пароль (обязательно):
      </span>
      <input
        ref={inputRef}
        type={isOpen ? "text" : "password"}
        name={paramNameId}
        id={paramNameId}
        required
        minLength={MINLENGTH}
        maxLength={MAXLENGTH}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="md:w-[60%] p-2 outline-none border-b border-b-slate-600 text-[0.85rem] bg-transparent focus:border-b-2 focus:border-b-slate-600 placeholder:text-[0.8rem] placeholder:text-slate-400 "
      />
      <span className="text-[0.7rem] text-slate-500">
        {`Введено: ${currLength} из (${MINLENGTH}-${MAXLENGTH})`}
        {currLength >= MINLENGTH ? (
          <span className="text-[1rem]">&#128526;</span>
        ) : null}
      </span>

      <button
        type="button"
        onClick={handleShowPass}
        title={isOpen ? "Скрыть" : "Показать"}
        tabIndex={-1}
        className="w-[22px] h-[16px] text-slate-500 text-[0.75rem] absolute right-1 md:right-[40%] top-8"
      >
        {isOpen ? <SVG_Eye /> : <SVG_Eye_Closed />}
      </button>
    </label>
  );
};

export default AuthPasswordComponent;
