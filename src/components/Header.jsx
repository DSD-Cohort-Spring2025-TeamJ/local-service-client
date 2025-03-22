import PropTypes from "prop-types";
import Button from "/src/components/Button.jsx";
import Logo from "/src/components/Logo.jsx";
import { useLocation } from "react-router-dom";

export default function Header({ setOpen }) {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-row mt-10 sm:gap-40 items-center sm:pl-8">
        <Logo />
        {location.pathname === "/admin" ? null : (
          <>
            <Button
              className="main-button book-online w-[200px] h-[75px] text-2xl p-10 "
              text="BOOK ONLINE"
              onClick={() => setOpen(true)}
            />

            <a
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="main-button bg-gray-300 rounded-[2rem] w-[90px] h-[30px] p-3 text-lg flex items-center text-center justify-center"
            >
              ADMIN
            </a>
          </>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
