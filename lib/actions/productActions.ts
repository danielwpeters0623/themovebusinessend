"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { z } from 'zod';
import { productFormSchema } from '../schemas/productFormSchema';


const cookieStore = cookies()
const supabase = createClient(cookieStore)



  const CreateProduct = productFormSchema
  

export async function createProduct(prevState: any, formData: FormData) {
    console.log('hit')
    const {data: {user}} = await supabase.auth.getUser()
    
    const ingredientsString = formData.get('ingredients') as string
    const ingredientsArray = ingredientsString.split(',').map(ingredient => ingredient.trim());


    const validatedFields = CreateProduct.safeParse({ 
        name: formData.get('name'),
        price: formData.get('price'),
        ingredients: ingredientsArray
    })



    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message:"Missing Fields. Failed to Create Product"
        }
        
    }



    try {
        const {data, error } = await supabase
        .from('product')
        .insert({
          name: validatedFields.data.name,
          price: validatedFields.data.price,
          ingredients: validatedFields.data.ingredients,  // Join the array back to a comma-separated string if necessary
          account_id: user?.id
          
        })
        
    } catch(error) {
        console.log('Error inserting data')
        
    }
}