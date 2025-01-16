//Реализация функции загрузки файла через xmlHttpRequest

export type TUploadPromise<T> = Promise<T> & { abort: () => void };

export const uploadFile = <T>(
  paramUrl: string,
  paramFile: File,
  paramKey: string, //Для ключа в formData
  options?: { onProgress?: (progress: number) => void }
): TUploadPromise<T> => {
  // Вытащили xhr из Promise, чтобы прокинуть abort
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  const onProgress = options?.onProgress;

  const promise = new Promise((resolve, reject) => {
    xhr.open("POST", paramUrl);

    xhr.upload.onprogress = (event) => {
      let total: number = event.total;
      if (total === 0) {
        total = 0.01;
      }
      onProgress?.(Math.round((event.loaded / total) * 100));
    };

    xhr.onload = () => {
      if (xhr.status === 200) resolve(xhr.response);
      else reject(xhr.response);
    };

    const myData = new FormData();
    myData.append(paramKey, paramFile);

    xhr.send(myData);
  }) as TUploadPromise<T>;

  // Присвоили свойство abort, которое прервет запрос
  //Через стрелочную функцию, чтобы не потерять контекст
  promise.abort = () => xhr.abort();

  return promise;
};
