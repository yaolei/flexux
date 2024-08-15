import {WebNav, MobileNav} from '../components/nav'

const Header = () => {

    return (
      <header className="fixed top-0 z-10 w-full bg-slate-100 shadow-md shadow-zinc-500">
        <div className='flex flex-row justify-center items-center m-4'>
          <div className="flex-1 flex flex-row items-center justify-center">
            <div className='flex-1  font-bold text-shadow sm:text-[4vw] md:pr-0 sm:pr-[10vw] lg:text-4xl'>
              <h1>Flexux</h1>
            </div>
            <div className='flex-none sm:hidden md:block max-w-[500px]' >
              <WebNav />
            </div>
          </div>
          <div className='md:hidden w-20 text-right' >
            <MobileNav />
          </div>
        </div>
      </header>
    ) 
}

export default Header;