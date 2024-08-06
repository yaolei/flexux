import SiteNav from '../components/nav'
const Header = () => {

    return (
      <header >
        <div className="fixed top-0 right-0 mr-5 mt-3 z-10">
          <SiteNav />
        </div>
        <h1 className=' text-center text-2xl mt-4'>欢迎来到Evan 学习ai测试区</h1>
      </header>
    ) 
}

export default Header;