'use client'
import { usePathname } from 'next/navigation'
const Footer = () => {
    const pathName = usePathname()
    return (
        <footer className="fixed text-center w-full pb-2 text-gray-400 bottom-0">
            {pathName === '/' ? <p>辽ICP备2024037165</p>: 
            <p>Evan @2024 Flexux.cn</p>}
        </footer>
    )
}

export default Footer;