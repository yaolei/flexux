'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import {NAVLISTROUTER} from '../lib/navlist'
import {MenuIcon} from 'lucide-react'
import {useState} from 'react'
import {
    User,
    Settings,
    UserPlus,
    Mail,
    LogOut,
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

const WebNav = () => { 
  const pathname = usePathname();
    return (
      <nav>
        <ul className='flex justify-center '>
        { NAVLISTROUTER && NAVLISTROUTER.map((siteRoute)=> (
            <li key={siteRoute.href + siteRoute.label} className='p-2'>
                <Link href={siteRoute?.href ? siteRoute?.href:""}
                className={`text-zinc-400 transition ${pathname ===siteRoute.href? "text-zinc-900 ": ""}  `}
                >
                {siteRoute.label}
                </Link>
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
]

const MobileNav = () => {
  const pathname = usePathname();
  const [MeuneState, setMeuneState] = useState(false)
  return(
  <DropdownMenu onOpenChange={() => MeuneState}>
    <DropdownMenuTrigger><MenuIcon className='text-left'/></DropdownMenuTrigger>
    <DropdownMenuContent className='md:w-full sm:w-[770px] mt-4 font-sans font-normal tracking-wider'>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      { NAVLISTROUTER && NAVLISTROUTER.map((mobileRoute:IconPropsType)=> (
            <DropdownMenuItem key={mobileRoute.href + mobileRoute.label} className='leading-5'>
                {Icons[mobileRoute?.MenuIconIndex]}
                <Link href={mobileRoute?.href ? mobileRoute?.href:""}
                onClick={()=> setMeuneState(false)}
                 className={`text-zinc-900 transition w-full ${pathname === mobileRoute.href?  " text-indigo-300 font-bold": ""}  `}>
                <p>{mobileRoute.label}</p>
                </Link>
            </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export  {
  WebNav,
  MobileNav
}