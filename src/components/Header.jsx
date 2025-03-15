import Button from '/src/components/Button.jsx'
import Logo from '/src/components/Logo.jsx'
import { useHistory } from 'react-router-dom'

export default function Header({ setOpen }) {

    const history = useHistory();

    return (
        <div className="flex flex-col items-center pl-8">
            <div className="flex flex-row gap-10 items-center pl-8">
                <Logo />
                <Button
                    className="book-online bg-[#4BCE4B] rounded-[3rem] no-underline px-[5px] py-[5px] w-[200px] h-[75px] text-2xl
                shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
                text-black-100 font-sans font-extrabold border-[1px] border-[#4BCE4B]
                hover:bg-green-700 hover:text-white
                active:scale-90 border-[#005701]"
                    text="BOOK ONLINE"
                    onClick={() => setOpen(true)}
                />
                <Button
                    className="bg-gray-300 rounded-[2rem] no-underline px-[5px] py-[5px] w-[100px] h-[35px]
                shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
                text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
                hover:bg-green-700 hover:text-white
                active:scale-90 border-[#005701] ml-95"
                    text="ADMIN"
                    onClick={() => history.push('/dashboard')}
                />
            </div>

        </div>
    )
}