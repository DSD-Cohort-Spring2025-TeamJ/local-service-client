import PropTypes from "prop-types";
import Button from "/src/components/Button.jsx";
import Logo from "/src/components/Logo.jsx";
import { useLocation } from "react-router-dom";

export default function Header({ setOpen }) {
  const location = useLocation();

    return (
        <div className="flex flex-col items-center pl-8 w-full">
            <div className="flex flex-row gap-30 items-center pl-8 w-full">
                <Logo />
                <Button
                    className="main-button book-online w-[200px] h-[75px] text-2xl p-10 
bg-[#4BCE4B]"
                    text="BOOK ONLINE"
                    onClick={() => setOpen(true)}
                />
                

                <Button
                    className="main-button bg-gray-300 rounded-[2rem] w-[90px] h-[30px] p-3 text-lg flex items-center text-center"
                    text="ADMIN"
                    onClick={() => history.push('/admin')}
                />

            </div>

        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
