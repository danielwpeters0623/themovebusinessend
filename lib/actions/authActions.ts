'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from "next/headers"
import { redirect } from 'next/navigation'
import loginSchema from '../schemas/loginSchema'



export async function signInFunction(formData: FormData) {
    console.log('function hit')
    try {
      const parsedData = loginSchema.parse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
  
      const email = parsedData.email;
      const password = parsedData.password;
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
  
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

  
      if (error) {
        return redirect('/login?message=Could not authenticate user');
      }
  
      console.log(email, password);
      return redirect('/dashboard');
    } catch (error) {
      // Handle validation errors
    //   return redirect(`/login?message=${error.errors.join(', ')}`);
    console.log(error)
    }
  }

  //Not used yet

  export const signUpFunction = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  //not used yet

  export const signOutFunction = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }