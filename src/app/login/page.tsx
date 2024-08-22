'use client'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useEffect, useState} from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    KeyRoundIcon,
    UtensilsCrossed,
    MailCheck,
    EyeIcon,
    EyeOffIcon,
} from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import { truncate } from 'fs/promises'

const iconStyle:string = " mr-2 size-10 ";

const formSchema = z.object({
    username:z.string().min(2, {
        message: `username must be at least 2 characters.`
    }).max(50, {
        message: `username at most 50 characters for input.`
    }),
    password: z.string().min(4, {
        message: `password must be at least 4 characters.`
    }).max(50, {
        message: `password at most 50 characters for input.`
    }),
    email: z.string(),
})

export default function profileForm () {
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState<boolean>(false);
    const [passwordInputType, setPasswordInputType] = useState<string>("password")
    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        }
    })

    function onSubmit(values:z.infer<typeof formSchema>) {
        console.log(form.formState.isSubmitSuccessful)

    }

    const handleTogglePsd = (toggleType:boolean) => {
        setTogglePasswordVisibility(toggleType)
        if(toggleType) {
           setPasswordInputType("text")
        } else {
            setPasswordInputType("password")
        }
    }

    return (
        <div className='mt-[90px] text-2xl flex justify-around items-center border-2 m-2'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 w-5/6 ">
                <Label className='text-center md:text-4xl sm:text-3xl '>Login to Flexux</Label>
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                <FormItem className='flex-col justify-between items-center'>
                    <FormLabel className='sm:text-2xl md:text-3xl flex'>
                        <UtensilsCrossed  className={iconStyle}/>
                        Username
                    </FormLabel>
                    <FormControl>
                    <Input  placeholder="This is your public display name." {...field} className='border-2 border-gray-400 outline-none p-2'/>
                    </FormControl>
                    <FormDescription>
                    This is your public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem className='flex-col justify-between items-center'>
                    <FormLabel className='sm:text-2xl md:text-3xl flex'>
                        
                        <KeyRoundIcon className= {iconStyle}/> PassWord
                    </FormLabel>
                    <FormControl className=' outline-none ring-0'>
                    <div className='flex border-2 rounded-[5px] border-gray-400'>
                        <Input type={passwordInputType}  
                            placeholder="This is your public display name." 
                            {...field} 
                            className='border-0 p-2 focus-visible:ring-0'/>
                        {togglePasswordVisibility?
                             <EyeIcon className={`${iconStyle} cursor-pointer`} onClick={() => handleTogglePsd(false)}/>
                             :<EyeOffIcon className={`${iconStyle} cursor-pointer`} onClick={() => handleTogglePsd(true)}/>
                        }
                    </div>
                   
                    </FormControl>
                    <FormDescription>
                    This is your account's password.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem className='flex-col justify-between items-center'>
                    <FormLabel className='sm:text-2xl md:text-3xl flex'>
                        <MailCheck className= {iconStyle}/> Email
                    </FormLabel>
                    <FormControl>
                    <Input  placeholder="This is your public email address." {...field} className='border-2 border-gray-400 focus-visible:ring-0 p-2'/>
                    </FormControl>
                    <FormDescription>
                    This is your account's Email.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />


                <div className='flex justify-center items-center'>
                    <Button type="reset" className='size-30' title='reset the form' onClick={()=>form.reset()}>Reset</Button>
                    <Button type="submit" className='size-30 m-5' title='submit the form'>Submit</Button>
                </div>
            </form>
        </Form>
      </div>
    )
}
