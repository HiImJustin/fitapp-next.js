import * as Yup from "yup";

export const userSchema = Yup.object({
    name: Yup.string()
        .required("The name field cannot be blank")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Only alphanumeric characters are allowed for this field "
        )
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
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Only alphanumeric characters are allowed for this field "
        )
        .max(30, "Must be less than 30 characters"),
    calPer100: Yup.number()
        .min(1, "Your food has more calories than 1 per 100grams")
        .max(10000, "Please a value less than Ten thousand")
        .required("This field cannot be blank"),
    protien: Yup.number()
        .required(" Protien field cannot be blank")
        .max(6, "Protien can only contain 6 characters"),
    carbs: Yup.number()
        .required(" Carbs field cannot be blank")
        .min(0, "Value must be more than 0")
        .max(10000, "Value cannot be more than 10,000"),
    fat: Yup.number()
        .required("Fats cannot be blank")
        .min(0, "Value must be more than 0")
        .max(10000, "Value cannot be more than 10,000"),
});

export const foodLogSchema = Yup.object({
    foodName: Yup.string()
        .required("Food name cannot be empty")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Only alphanumeric characters are allowed for this field "
        )
        .max(30, "Must be less than 30 characters"),
    calories: Yup.number()
        .min(1, "Your food has more calories than 1 per 100grams")
        .max(10000, "Please a value less than Ten thousand")
        .required("This field cannot be blank"),
    protien: Yup.number()
        .required(" Protien field cannot be blank")
        .max(600, "Protien per 100 isnt 600 grams"),
    carbs: Yup.number()
        .required(" Carbs field cannot be blank")
        .min(0, "Value must be more than 0")
        .max(10000, "Value cannot be more than 10,000"),
    fat: Yup.number().required("Fats cannot be blank"),
    servingType: Yup.string()
        .required("serving type cannot be empty")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Only alphanumeric characters are allowed for this field "
        ),
    servingSize: Yup.number()
        .required("serving size cannot be blank")
        .max(
            10000,
            "please choose a lower number or use a different unit of measurement"
        )
        .min(1, "serving size cannot be lower than 1 or use grams instead"),
});

export const registerSchema = Yup.object({
    name: Yup.string()
        .required("The name field cannot be blank")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Only alphanumeric characters are allowed for this field "
        )
        .max(30, "Please choose a name with less than 30 characters"),
    age: Yup.number()
        .min(1, "its reccomended to be older than 1 year old to track calories")
        .max(200, "Please choose age under 200")
        .required("The age field cannot be blank"),
    weight: Yup.number()
        .required("The weight field cannot be blank")
        .min(1, "please weight something")
        .max(
            700,
            "you dont weigh more than 700kgs, if you do contact someone to claim a world record"
        ),
    height: Yup.number()
        .positive()
        .required("The Height field cannot be blank")
        .min(50, "Please choose a heigh more than 50cm")
        .max(300, "Please choose a heigh less than 300cm"),
    sex: Yup.string()
        .required("The sex field cannot be blank")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Only alphanumeric characters are allowed for this field "
        ),
    activity: Yup.string()
        .required("The activity field cannot be blank")
        .matches(
            /^[a-zA-Z0-9]+$/,
            "Only alphanumeric characters are allowed for this field "
        ),
    tdee: Yup.number()
        .required("The activity field cannot be blank")
        .min(100, "tdee is invalid")
        .max(20000, "tdee is too high"),
    bmr: Yup.number()
        .required("The activity field cannot be blank")
        .min(100, "bmr value is too low")
        .max(20000, "bmr value is too high"),
});
