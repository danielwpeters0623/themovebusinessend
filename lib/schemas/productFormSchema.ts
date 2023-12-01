import {z} from "zod"

export  const productFormSchema = z.object({
  name: z.string({
      invalid_type_error: "Please put in a name"
  }),
  price: z.coerce.number().gt(0, {message: 'Please enter an amount greater than $0'}),
  ingredients: z.string(),
})