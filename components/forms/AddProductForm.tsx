'use client'

import { createProduct } from "@/lib/actions/productActions";
import React, {useRef} from 'react'
import { Input } from '../ui/input'

import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

// const handleSubmit = async (values: z.infer<typeof productFormSchema>) => {
//     console.log(values)
//     try {
//         await createProduct(values)
//     } catch (err) {
//         console.error(err)
//     }
// };


export const AddProductForm = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [state, formAction] = useFormState(createProduct, null)
    return (
        <form className='space-y-8'  action ={async (formData: FormData) => {
            formAction(formData)
            formRef.current?.reset()
        }} ref={formRef}>
       <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Product Name!</label>
        <Input type="text" name="name" required />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Price</label>
        <Input type="number" name="price" min="0" step="0.01" required />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-gray-700">Ingredients</label>
        <Input type="text" name="ingredients" required />
        <span className="text-gray-500 text-sm">
          Enter ingredients separated by commas (e.g., ingredient1, ingredient2)
        </span>
      </div>

        <SubmitButton />
        </form>
        
    )
    
}