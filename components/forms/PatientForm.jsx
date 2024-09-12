"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form} from "@/components/ui/form"
import "react-phone-number-input/style.css";
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { createUser } from "@/lib/actions/patient.actions"
import { useRouter } from "next/navigation"
import { UserFormValidation } from "@/lib/validation"
import { FormFieldType } from "@/constans"

const formSchema = UserFormValidation;

 
const PatientForm = ()=> {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })
 
    async function onSubmit({name,email,phone}) {
        console.log('ok')
        setIsLoading(true);
        try{
            const userData = {name,email,phone};
            const newUser = await createUser(userData);
            if (newUser) {
                router.push(`/patients/${newUser.$id}/register`);
            }
        }catch(error){
            console.log("aa gya error")
            console.log(error);
        }
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
