import { z } from "zod";

export const userSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .min(4, { message: "Имя должно быть больше 3-x символов" })
      .max(32, { message: "Имя не больше 32-х символов" }),

    email: z.string().trim().email({ message: "Введите корректный e-mail" }),
    userkey: z
      .string()
      .trim()
      .min(8, { message: "Длина пароля не менее 8-ми символов." })
      .max(32, { message: "Длина пароля не более 32-х символов" }),
    checkkey: z
      .string()
      .trim()
      .min(8, { message: "Длина пароля не менее 8 символов!" })
      .max(32, { message: "Длина пароля не более 32-х символов" }),
  })
  .refine(
    (obj) => {
      return obj.userkey.toLowerCase() === obj.checkkey.toLowerCase();
    },
    { message: "Проверочный пароль и пароль должны совпадать!" }
  );

export const checkSchema = z
  .object({
    name: z
      .string({
        required_error: "Имя не должно быть пустым",
        invalid_type_error: "Это должно быть строкой.",
      })
      .trim()
      .min(5, { message: "Имя должно быть 5 или больше символов." }),
    completed: z.boolean({ message: "Булево значение" }),
    currentDate: z.string().date(),
    beginD: z.string().datetime({
      message: "Не верный формат даты или времени",
    }),
    endD: z.string().datetime({
      message: "Неверный формат даты или времени",
    }),
  })
  .refine(
    (obj) => {
      let currDate = obj.beginD.split("T")[0];

      let fromDate = obj.currentDate;

      // console.log(obj.beginD, currDate, fromDate);
      return currDate.toLowerCase() === fromDate.toLowerCase();
    },
    {
      message: "Дата начала не может быть меньше или больше текущей!",
    }
  )
  .refine(
    (obj) => new Date(obj.endD).getTime() > new Date(obj.beginD).getTime(),
    {
      message: "Дата окончания должна быть больше Даты начала",
    }
  );
