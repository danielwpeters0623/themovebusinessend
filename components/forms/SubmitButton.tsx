"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"

export default function SubmitButton() {
    const {pending} = useFormStatus()
    return (
        <Button type="submit" className='border bg-green-300'>
            {pending ? "Saving..." : "Save"}
        </Button>
    )
}