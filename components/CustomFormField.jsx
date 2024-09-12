'use client'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldType, GenderOptions } from "@/constans"
import PhoneInput from "react-phone-number-input";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import FileUploader from "./FileUploader";

const RenderField = ({field,props})=>{
    const {fieldType,iconSrc,iconAlt,placeholder,showTimeSelect,dateFormat,renderSkeleton}=props;
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                    <Image
                        src={iconSrc}
                        height={24}
                        width={24}
                        alt={iconAlt || "icon"}
                        className="ml-2"
                    />
                    )}
                    <FormControl>
                    <Input
                        placeholder={placeholder}
                        {...field}
                        className="shad-input border-0"
                    />
                    </FormControl>
            </div>
            );
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                    defaultCountry="IN"
                    placeholder={placeholder}
                    international 
                    withCountryCallingCode
                    value={field.value}
                    onChange={field.onChange}
                    className="input-phone"
                    />
                </FormControl>
            );
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                <Image
                    src="/assets/icons/calendar.svg"
                    height={24}
                    width={24}
                    alt="user"
                    className="ml-2"
                />
                <FormControl>
                    <ReactDatePicker
                    showTimeSelect={showTimeSelect ?? false}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    timeInputLabel="Time:"
                    dateFormat={dateFormat ?? "MM/dd/yyyy"}
                    wrapperClassName="date-picker"
                    />
                </FormControl>
                </div>
            );
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="shad-select-trigger">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                        {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                    placeholder={placeholder}
                    {...field}
                    className="shad-textArea"
                    disabled={props.disabled}
                    />
                </FormControl>
            );
        case FormFieldType.GENDER:
            return(                                
            <FormControl>
                <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    {GenderOptions.map((option, i) => (
                        <div key={option + i} className="radio-group">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">
                                {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
            );
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                <div className="flex items-center gap-4">
                    <Checkbox
                    id={props.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                    <label htmlFor={props.name} className="checkbox-label">
                    {props.label}
                    </label>
                </div>
                </FormControl>
            );
        case FormFieldType.FILEUPLOADER:
            return(         
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>);
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
