import { useContext } from "react";
import { ImStatsBars } from "react-icons/im";
import { AuthContext } from "../context/authContext";
import { isFeatureEnabled, getFlagValue } from "../config/remoteConfig";
import { FEATURE_ENABLE_STATS, WELCOME_MESSAGE } from "../constants/flags";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const welcomeMessage = getFlagValue(WELCOME_MESSAGE);
  const isShowStatsEnabled = isFeatureEnabled(FEATURE_ENABLE_STATS);

  return (
    <header className='container max-w-2xl px-6 py-6 mx-auto'>
      <div className='flex items-center justify-between'>
        {user && !loading && (
          <div className='flex items-center gap-2'>
            <div className='h-[40px] w-[40px] rounded-full overflow-hidden'>
              <img
                className='object-cover w-full h-full'
                src={user.photoURL}
                alt={user.displayName}
                referrerPolicy='no-referrer'
              />
            </div>

            <small>
              {welcomeMessage}, {user.displayName}!
            </small>
          </div>
        )}

        {user && !loading && (
          <nav className='flex items-center gap-4'>
            <ThemeSwitcher />

            {isShowStatsEnabled && (
              <a href='#stats'>
                <ImStatsBars className='text-2xl' />
              </a>
            )}

            <div>
              <button onClick={logout} className='btn btn-danger'>
                Sign out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
