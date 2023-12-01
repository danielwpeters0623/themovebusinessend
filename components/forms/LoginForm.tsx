'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import loginSchema from '@/lib/schemas/loginSchema'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form"
  import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'


const LoginForm = () => {
const router = useRouter()
const supabase = createClient()

  
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema)
    })  

    

    const handleSignIn = async (values: z.infer<typeof loginSchema>) => {
      console.log(values)
      await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password
      })
      router.push("/dashboard")

  }



    return (
    
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)} className='space-y-2'>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
            <FormControl>
                <Input type='email' placeholder="Email" defaultValue={field.value} onChange={field.onChange} />
            </FormControl>
            <FormDescription>
             Please enter your email address
            </FormDescription>
            <FormMessage />
          </FormItem>
          )}
        />
        <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
            <FormControl>
                <Input type='password' placeholder="Password" defaultValue={field.value} onChange={field.onChange} />
            </FormControl>
            <FormDescription>
              Please enter your password
            </FormDescription>
            <FormMessage />
          </FormItem>

          )}
        />
                <Button className='w-full' type='submit'>Login</Button>
            </form>
          </Form>
    
  )
}

export default LoginForm



// <Label htmlFor="email">Email</Label>
// <Input id="email" placeholder="m@example.com" required type="email" />
// <Input id="password" placeholder="*******" required type="password" />
