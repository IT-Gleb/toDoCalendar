type TPropertyDeleteTasks = {
  userId: string | undefined | null;
  taskId: string;
  closeClick(): Promise<void>;
};

export const DeleteTaskForm: React.FC<TPropertyDeleteTasks> = (param) => {
  return (
    <div className="w-[95%] md:[80%] lg:w-[65%] mx-auto flex flex-col bg-white border-4 border-slate-300 text-[0.9rem] rounded-lg overflow-hidden">
      <div className="bg-sky-500 text-white text-[0.8rem] flex items-start justify-between p-2">
        Удаление задачи - [{param.taskId}]
        <button
          type="button"
          tabIndex={-1}
          className="w-[20px] h-[20px] px-[2px] py-[1px] bg-pink-600 text-[0.55rem] font-bold"
          onClick={async () => await param.closeClick()}
          title="Закрыть"
        >
          x
        </button>
      </div>
      <div className="min-h-[20vh] flex-auto p-4 bg-[url('../../assets/images/svg/back02.svg')] bg-no-repeat bg-center bg-cover">
        <p>Подтвердите удаление задачи. {param.userId}</p>
      </div>

      <div className="bg-sky-500 text-[0.75rem] p-2 text-center text-slate-700 font-mono">
        &copy; by Gleb Torgashin 2021-2025
      </div>
    </div>
  );
};
