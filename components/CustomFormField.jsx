'use client'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldType } from "./forms/PatientForm"
import PhoneInput from "react-phone-number-input";
import Image from "next/image";

const RenderField = ({field,props})=>{
    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                    <Image
                        src={props.iconSrc}
                        height={24}
                        width={24}
                        alt={props.iconAlt || "icon"}
                        className="ml-2"
                    />
                    )}
                    <FormControl>
                    <Input
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-input border-0"
                    />
                    </FormControl>
            </div>
            );
          return (
            <FormControl>
              <Textarea
                placeholder={props.placeholder}
                {...field}
                className="shad-textArea"
                disabled={props.disabled}
              />
            </FormControl>
          );
        case FormFieldType.PHONE_INPUT:
            console.log(props)
            return (
                <FormControl>
                    <PhoneInput
                    defaultCountry="IN"
                    placeholder={props.placeholder}
                    international 
                    withCountryCallingCode
                    value={field.value}
                    onChange={field.onChange}
                    className="input-phone"
                    />
                </FormControl>
            );
        default:
            return null;
    }
}
  

const CustomFormField = (props) => {
    const {control,fieldType,name,label} = props;

    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className ='flex-1'>
                {fieldType !==FormFieldType.CHECKBOX && label && (
                    <FormLabel className="shad-input-label">{label}</FormLabel>
                )}

                <RenderField field={field} props={props}/>

                <FormMessage className='shad-error'/>
            </FormItem>
        )}
        />
    )
}

export default CustomFormField
