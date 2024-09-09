"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form} from "@/components/ui/form"
import "react-phone-number-input/style.css";
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"

const formSchema = z.object({
    username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
    }),
})
export const FormFieldType = {
    INPUT: "input",
    TEXTAREA: "textarea",
    PHONE_INPUT: "phoneInput",
    CHECKBOX: "checkbox",
    DATE_PICKER: "datePicker",
    SELECT: "select",
    SKELETON: "skeleton",
};
 
const PatientForm = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })
 
    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Get started with appointments.</p>
                </section>
                <CustomFormField control={form.control}
                    fieldType={FormFieldType.INPUT} name={'name'} label={'Full Name'} placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg" iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />

                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="9598484"
                />
                <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm
