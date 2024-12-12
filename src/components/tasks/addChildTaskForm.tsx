import { memo } from "react";

type TChildTaskFormParam = {
  paramItem: Partial<TTask>;
  paramClick(): Promise<void>;
};

export const AddChildTaskForm: React.FC<TChildTaskFormParam> = memo((param) => {
  return (
    <div className="w-[90%] sm:w-[80%] md:w-[75%] lg:w-[60%] flex flex-col mx-auto border-4 border-slate-100 rounded-sm lg:rounded-lg bg-white overflow-hidden text-[0.75rem]">
      <div className="bg-sky-400 text-yellow-50 min-h-[2vh] p-2 flex items-start gap-x-1 justify-between">
        <span className="line-clamp-3">
          Добавить подзадачу к :: [{param.paramItem.name}]
        </span>
        <button
          type="button"
          onClick={async () => await param.paramClick()}
          className="w-[24px] h-[20px] bg-pink-500 text-yellow-50 px-2 py-[2px] text-[0.6rem] font-bold "
          title="Закрыть"
          tabIndex={-1}
        >
          x
        </button>
      </div>
      <article className="p-2 min-h-[10vh] bg-[url('../../assets/images/svg/back02.svg')] bg-no-repeat bg-cover bg-center relative flex-auto">
        <p>{param.paramItem.id}</p>
        <p>
          Далеко-далеко, за словесными горами в стране гласных и согласных живут
          рыбные тексты. Возвращайся повстречался всеми необходимыми буквенных
          взгляд, меня выйти дороге но реторический себя до которое за сбить,
          послушавшись предупреждал? Маленький всемогущая лучше возвращайся наш
          ему, сих ipsum алфавит использовало, деревни что курсивных
          парадигматическая грустный ты диких!
        </p>
      </article>
      <div className="bg-sky-400/75 text-slate-700 min-h-[2vh] p-2 text-center text-[0.7rem] font-mono">
        &copy; by Gleb Torgashin 2021-2025
      </div>
    </div>
  );
});
