const props = {
    className: "",
    text: "",
    onClick: () => "",
}

export default function Button(props) {
    return (
        <button className={props.className} onClick={() => props.onClick()}>
            {props.text}
        </button>
    )
}

/* <Button 
        className="bg-[#4BCE4B] rounded-[1rem] no-underline px-[5px] py-[5px] w-[100px]
        shadow-[inset_0_-25px_18px_-14px_rgba(1,185,38,0.35),0_1px_2px_rgba(1,177,30,0.35),0_2px_4px_rgba(3,194,79,0.35),0_4px_8px_rgba(1,192,17,0.35),0_8px_16px_rgba(1,119,42,0.35),0_16px_32px_rgba(2,199,78,0.35)]
        text-[#4B4B4B] font-sans border-[1px] border-[#4BCE4B]
        hover:bg-green-700 hover:text-white
        active:scale-90"
        onClick={}
        text="click me"
        /> */