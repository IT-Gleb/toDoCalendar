//Проверка на undefined or null
export function isValue(paramValue: unknown): boolean {
  if (typeof paramValue === "undefined" || paramValue === null) {
    return false;
  }
  return true;
}

export function SortTaskByBeginAt(param1: TPartTask, param2: TPartTask) {
  const date1: number = new Date(
    param1.begin_at as unknown as string
  ).getTime();
  const date2: number = new Date(
    param2.begin_at as unknown as string
  ).getTime();
  if (date1 < date2) {
    return -1;
  } else {
    return 1;
  }
}

//Ищет по вложенным данным объект с заданным Id
export function findTaskById(
  param: TTaskList,
  paramId: string
): TPartTask | null {
  let result: TPartTask | null = null;

  const queue = [param];
  while (queue.length > 0) {
    let item: TTaskList | undefined = queue.shift();

    if (!isValue(item)) {
      continue;
    }
    // item?.forEach((_item) => {
    //   if (_item.id === paramId) {
    //     result = _item;
    //     return result;
    //   }
    //   if (isValue(_item.items) && typeof _item.items == "object") {
    //     queue.push(_item.items as TTaskList);
    //   }
    // });
    for (let _item of item as TTaskList) {
      if (_item.id === paramId) {
        result = _item;
        break;
      }
      if (isValue(_item.items) && typeof _item.items == "object") {
        queue.push(_item.items as TTaskList);
      }
    }
  }
  if (isValue(result)) {
    const subTasks = (result as unknown as TPartTask).items;
    if (isValue(subTasks)) {
      subTasks?.sort(SortTaskByBeginAt);
    }
  }

  return result;
}

export function SetTaskById(
  param: TTaskList,
  paramId: string,
  paramObj: TPartTask
) {
  const queue = [param];

  while (queue.length > 0) {
    let item = queue.shift();
    if (!isValue(item)) {
      continue;
    }

    for (let _item of item as TTaskList) {
      if (_item.id === paramId) {
        //console.dir(_item);
        //console.dir(paramObj);
        _item = Object.assign({}, paramObj);
        //console.log(paramId, item);
        break; //return _item as TPartTask;
      }
      if (isValue(_item.items) && typeof _item.items == "object") {
        queue.push(_item.items as TTaskList);
      }
    }
  }
}

//Разворачивает иеархический массив задач в плоский массив
export function getTasksFromObject(param: TTaskList) {
  const result: TTaskList = [];
  const queue = [param];

  while (queue.length > 0) {
    let item = queue.shift();

    if (isValue(item)) {
      if (Array.isArray(item)) {
        item?.forEach((_item) => {
          if (isValue(_item.items) && typeof _item.items == "object") {
            result.push(_item);
            queue.push(_item.items as TTaskList);
          }
        });
        // for (let _item of item as TTaskList) {
        //   if (isValue(_item.items) && typeof _item.items == "object") {
        //     result.push(_item);
        //     queue.push(_item.items as TTaskList);
        //   }
        // }
      }
    } else {
      continue;
    }
  }

  //Сортировка
  if (result.length > 0) {
    result.sort(SortTaskByBeginAt);
  }

  // console.log(result.length);
  // result.forEach((item) =>
  //   console.log(item.id, item.parent_id, item.name, item.level)
  // );

  return result;
}

//возвращает значение completed агрегированное со всех задач
export function getCompletedFromList(param: TTaskList): boolean {
  let result: boolean = false;

  //const data: TTaskList = getTasksFromObject(param);

  if (isValue(param) && param.length > 0) {
    result = param.every((item) => item.completed === true);
  }

  return result;
}

//Возвращает минимальное значение датыы начала задачи из вложенных задач
export function getMinBeginAtFromList(param: TTaskList): number {
  let result: number = -1;
  //const data: TTaskList = getTasksFromObject(param);

  if (isValue(param) && param.length > 0) {
    const tmp: number[] = [];
    param.forEach((item) => {
      let dt: number = new Date(item.begin_at as unknown as string).getTime();
      tmp.push(dt);
    });

    result = Math.min(...tmp);
  }

  return result;
}

//Возвращает максимальное окончание даты задачи из вложенных задач
export function getMaxEndAtFromList(param: TTaskList): number {
  let result: number = -1;
  //const data: TTaskList = getTasksFromObject(param);

  if (isValue(param) && param.length > 0) {
    const tmp: number[] = [];
    param.forEach((item) => {
      let dt: number = new Date(item.end_at as unknown as string).getTime();
      tmp.push(dt);
    });

    result = Math.max(...tmp);
  }

  return result;
}
