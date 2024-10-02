import * as z from "zod";

const monthEnum = z.enum([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

export const schema = z.object({
  firstName: z
    .string()
    .min(2, "Please enter at least 2 character(s)")
    .max(50, "First name must not exceed 50 characters"),
  middleName: z
    .string()
    .max(50, "Middle name must not exceed 50 characters")
    .optional(),
  lastName: z
    .string()
    .min(2, "Please enter at least 2 character(s)")
    .max(50, "Last name must not exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must not exceed 15 digits"),
  address: z
    .string()
    .min(2, "Address must be at least 2 characters long")
    .max(255, "Address must not exceed 255 characters"),
  employeeStatus: z.enum(["Permanent", "Contract", "Casual"]),
  startDay: z.number().min(1).max(31),
  startMonth: monthEnum,
  startYear: z.number().min(1900).max(new Date().getFullYear()),
  finishDay: z.union([
    z.coerce.number().min(1).max(31),
    z
      .literal("")
      .transform(() => null)
      .nullable(),
  ]),
  finishMonth: z
    .union([monthEnum, z.literal("").transform(() => null)])
    .nullable(),
  finishYear: z.union([
    z.coerce
      .number()
      .min(1900)
      .max(new Date().getFullYear() + 100),
    z
      .literal("")
      .transform(() => null)
      .nullable(),
  ]),
  onGoing: z.boolean(),
  employmentBasis: z.enum(["Full-time", "Part-time"]),
  hoursPerWeek: z.union([
    z.coerce.number().min(1).max(38),
    z.literal("").transform(() => null),
  ]),
});
// .refine((data) => {
//   if (data.onGoing) {
//     return true;
//   }
//   return (
//     data.finishDay !== null &&
//     data.finishMonth !== null &&
//     data.finishYear !== null
//   );
// })
// .refine(
//   (data) => {
//     // If employmentBasis is "Full-time", hoursPerWeek is optional
//     if (data.employmentBasis === "Full-time") {
//       return true;
//     }
//     // If it's not "Full-time", hoursPerWeek must be provided
//     return data.hoursPerWeek !== null && data.hoursPerWeek !== undefined;
//   },
//   {
//     message: "Hours per week is required unless the employment is full-time.",
//     path: ["hoursPerWeek"],
//   }
// );

export type EmployeeFormData = z.infer<typeof schema>;
