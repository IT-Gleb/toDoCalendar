import { useState, useRef } from "react";

const MINLENGTH: number = 4;
const MAXLENGTH: number = 32;

export const AuthNickNameComponent = () => {
  const [strLength, setStrLength] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const nickRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrLength(event.currentTarget.value.length);
  };

  const handleBlur = () => {
    setIsActive(false);
  };
  const handleFocus = () => {
    setIsActive(true);
  };

  const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (nickRef.current) {
      nickRef.current.value = "";
      setStrLength(0);
    }
    nickRef.current?.focus();
  };

  return (
    <label
      className="flex flex-col space-y-1 relative"
      aria-labelledby="u-nickname"
    >
      <span
        className={`text-[0.8rem] ${
          isActive ? "animate-bounce text-sky-800" : "text-inherit`"
        }`}
      >
        Ваше имя (обязательно):
      </span>
      <input
        ref={nickRef}
        type="text"
        name="u-nickname"
        id="u-nickname"
        required
        autoComplete="off"
        maxLength={MAXLENGTH}
        minLength={MINLENGTH}
        placeholder="Как к Вам обращаться..."
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className=" md:w-[80%] py-2 pl-2 pr-6 outline-none border-b border-b-slate-600 text-[0.85rem] bg-transparent focus:border-b-2 focus:border-b-slate-600 placeholder:text-[0.8rem] placeholder:text-slate-400 "
      />
      <span className="text-[0.7rem] text-slate-500">
        {`Введено ${strLength} из (${MINLENGTH}-${MAXLENGTH})`}
        {strLength >= MINLENGTH ? (
          <span className="text-[1rem]">&#128578;</span>
        ) : null}
      </span>
      {strLength > 0 && (
        <button
          type="button"
          title="Oчистить"
          onClick={handleClearClick}
          tabIndex={-1}
          className="w-[16px] h-[14px] text-black bg-slate-300 px-1 text-[0.6rem] active:scale-90 absolute right-1 md:right-[20%] top-8"
        >
          x
        </button>
      )}
    </label>
  );
};

export default AuthNickNameComponent;
