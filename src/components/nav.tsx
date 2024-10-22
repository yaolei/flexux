'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import {NAVLISTROUTER} from '../lib/navlist'
import {MenuIcon} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {
    User,
    Settings,
    UserPlus,
    Mail,
    LogOut,
    LogIn,
  } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'
import Cookies from 'js-cookie';
import {useAppDispatch, useAppSelector} from '@/lib/store'
import { setLoginToggle } from '@/lib/features/loginState'

type validateDatasProp = {
  validateMessage:string
  validateState: boolean
}
const DialogView = ({closeDopDown}:{closeDopDown:(flg:boolean)=> void}) => {
  const router = useRouter();
  const _userName = useRef<HTMLInputElement>(null);
  const _password = useRef<HTMLInputElement>(null);
  const [showValidataErrorInput, setShowValidateInput] = useState<boolean>(false);
  const [validateErrorMessage, setValidateErrorMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.isloginState.isLogin)
  useEffect(() =>{
    const token = Cookies.get('token');
    if (token && token.length > 0) {
        dispatch(setLoginToggle(true));
    }
  },[isLogin])

  const { toast } = useToast();

  const handleLinkToCreateAccount = () => {
    closeDialog();
    router.push('/singup')
  }

  const closeDialog = () => {
    closeDopDown(false);
    setOpen(false);
  }
 
  const onSubmit = async () => {
    if (_userName.current != null && _password.current != null) {
      if ( _userName.current.value.trim().length <= 0 || _password.current.value.trim().length <= 0) {
        setShowValidateInput(false)
        setValidateErrorMessage("User name and Password couldn't be empty.")
        return false
      } else {
        if (!showValidataErrorInput) {
          setShowValidateInput(true)
          setValidateErrorMessage("");
        }
        const url = `${location.protocol}//${location.host}/api/validate-user`;
        const userLoingDatas = {
          username:_userName.current.value,
          password:_password.current.value
        }
        try {
          const validateUser = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLoingDatas),
        })

        const validateDatas:validateDatasProp = await validateUser.json();
        const {validateMessage, validateState} = validateDatas;
        toast({
          title: validateState ? `Success login system.`: `Error: error number - 403`,
          description: validateState? `Success login and will link to login page.`: `Error: ${validateMessage}`,
          duration: validateState? 1000: 5000,
          variant:validateState ? "default": "destructive",
        })

          if (validateState) {
          dispatch(setLoginToggle(true));
            setTimeout(() => {
                closeDialog();
                router.push("login")
            }, 1100)
          } else {
            dispatch(setLoginToggle(false));
          }
        }
        catch (error: any) {
            throw new Error(error.message)
        }
      }
    }
  }

  const exitLoginUser = () => {
    Cookies.remove('token');
    dispatch(setLoginToggle(false));
  }

  return (
   <>
   {isLogin ? <div key="loginT" className={`flex justify-center items-center cursor-pointer text-zinc-400`} onClick={exitLoginUser}>Log out</div>
    :
   <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div key="loginT" className={`flex justify-center items-center cursor-pointer text-zinc-400`}>Login</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login Flexux</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
          {!showValidataErrorInput && 
            <DialogDescription className=' text-red-400'>
                  {validateErrorMessage}
            </DialogDescription>
          }
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="test3"
              className="col-span-3"
              ref={_userName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Password
            </Label>
            <Input
              id="username"
              defaultValue="1234"
              className="col-span-3"
              ref={_password}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleLinkToCreateAccount}>Create New Account</Button>
          <Button onClick= {onSubmit}>Login Flexux</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        }
        </>
      )
}

const WebNav = () => {
  const pathname = usePathname();
  
    return (
      <nav>
        <ul className='flex justify-center'>
        { NAVLISTROUTER && NAVLISTROUTER.map((siteRoute)=> (
            <li key={siteRoute.href + siteRoute.label} className='p-2'>
              {siteRoute.label == 'login'? 
                    <DialogView closeDopDown={(flg)=> {}}/>
            :<Link href={siteRoute?.href ? siteRoute?.href:""}
                className={`text-zinc-400 transition ${pathname ===siteRoute.href? "text-zinc-900 ": ""}  `}
                >
                {siteRoute.label}
                </Link>
              }
            </li>
        ))} 
        </ul>
      </nav>
    ) 
}

type IconPropsType = {
  href: string;
  label: string;
  MenuIconIndex?: any;
}

const Icons = [
  <User className="mr-2 h-4 w-4"/>, 
  <Settings className="mr-2 h-4 w-4"/>, 
  <UserPlus className="mr-2 h-4 w-4"/>, 
  <Mail className="mr-2 h-4 w-4"/>, 
  <LogOut className="mr-2 h-4 w-4"/>, 
  <LogIn className="mr-2 h-4 w-4"/>, 
]

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const handleCloseDropDown = (flg:boolean) => {
    setOpen(flg);
  }
  return(
  <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger><MenuIcon className='text-left'/></DropdownMenuTrigger>
    <DropdownMenuContent className='md:w-full sm:w-[770px] mt-4 font-sans font-normal tracking-wider'>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      { NAVLISTROUTER && NAVLISTROUTER.map((mobileRoute:IconPropsType)=> (
        <div key={mobileRoute.href + mobileRoute.label}>
          {mobileRoute.label === 'login'? 
            <div key="loginH" className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                      {Icons[mobileRoute?.MenuIconIndex]}
                      <DialogView closeDopDown={handleCloseDropDown}/>
            </div>
          :
          <Link  href={mobileRoute?.href ? mobileRoute?.href:""}
            className={`text-zinc-900 transition w-full hover:bg-violet-400 ${pathname === mobileRoute.href?  " text-indigo-300 font-bold": ""}  `}>
            <DropdownMenuItem key={mobileRoute.href + mobileRoute.label} className='leading-5'>
                {Icons[mobileRoute?.MenuIconIndex]}
                <p>{mobileRoute.label}</p>
            </DropdownMenuItem>
            </Link>
               }
            </div>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export  {
  WebNav,
  MobileNav
}