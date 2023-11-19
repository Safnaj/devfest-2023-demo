import { ImStatsBars } from "react-icons/im";

const Navbar = () => {
  return (
    <header className='container max-w-2xl px-6 py-6 mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
            <img
              className='object-cover w-full h-full'
              src='https://wallpapers.com/images/hd/professional-profile-pictures-1080-x-1080-460wjhrkbwdcp1ig.jpg'
              referrerPolicy='no-referrer'
            />
          </div>

          <small>Hi, Ahamed Safnaj!</small>
        </div>

        <nav className='flex items-center gap-4'>
          <div>
            <a href='#stats'>
              <ImStatsBars className='text-2xl' />
            </a>
          </div>
          <div>
            <button className='btn btn-danger'>Sign out</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
