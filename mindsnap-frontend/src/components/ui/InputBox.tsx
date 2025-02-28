interface InputProps {
    type : string,
    placeholder : string;
    reference? : any;
    className?: string; 

}

const InputBox = ({type, placeholder, reference} : InputProps) => {

    return <div>  
        <input ref={reference} type={type} placeholder={placeholder} className=" w-70 h-10 p-2 ring ring-black rounded-md " />
    </div>

}



export default InputBox;