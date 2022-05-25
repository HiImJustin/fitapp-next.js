import * as Yup from "yup";

export const userSchema = Yup.object({
    name: Yup.string()
        .required("The name field cannot be blank")
        .max(30, "Please choose a name with less than 30 characters"),
    email: Yup.string()
        .required("The email field cannot be blank")
        .email()
        .max(30, "Please choose a name with less than 30 characters"),
    userType: Yup.string().required("The admin field cannot be blank"),
});

export const foodSchema = Yup.object({
    foodName: Yup.string()
        .required("Food name cannot be empty")
        .max(30, "Must be less than 30 characters"),
    calPer100: Yup.number()
        .min(1, "Your food has more calories than 1 per 100grams")
        .max(10000, "Please a value less than Ten thousand")
        .required("This field cannot be blank"),
    protien: Yup.string()
        .required(" Protien field cannot be blank")
        .max(6, "Protien can only contain 6 characters"),
    carbs: Yup.number()
        .required(" Carbs field cannot be blank")
        .min(0, "Value must be more than 0")
        .max(10000, "Value cannot be more than 10,000"),
    fat: Yup.string().required("Fats cannot be blank"),
});
