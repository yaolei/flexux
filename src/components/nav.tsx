'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import {NAVLISTROUTER} from '../lib/navlist'
const siteNav = () => {
  const pathname = usePathname();
    return (
      <nav>
        <ul className='flex justify-center '>
        { NAVLISTROUTER && NAVLISTROUTER.map((siteRoute)=> (
            <li key={siteRoute.href + siteRoute.label} className='p-2'>
                <Link href={siteRoute?.href ? siteRoute?.href:""}
                className={`text-zinc-400 transition ${pathname ===siteRoute.href? "text-zinc-900": ""}  `}
                >
                {siteRoute.label}
                </Link>
            </li>
        ))} 
        </ul>
      </nav>
    ) 
}
export default siteNav