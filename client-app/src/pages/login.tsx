import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function login(){
    return(
        <div className="flex h-screen justify-center items-center w-full">
            <div className="rounded-xl bg-white w-[90%] lg:w-[609px] lg:h-[501px] py-10 flex flex-col items-center text-center">
                <div className="flex flex-col items-center">
                    <Logo size="" color="dark" />
                    <div className="text-[#101010] md:mt-6 text-[15px]">Securely login to your account</div>
                </div>
                <div className="mt-10 w-5/6 lg:w-[352px]">
                    <form>
                        <div className="">
                            <input type="email" placeholder="email" className="formInput-login"/>
                        </div>
                        <div className="mt-3">
                            <input type="password" placeholder="password" className="formInput-login"/>
                        </div>
                        <div className="flex justify-between mt-6 text-[13px] leading-[14px] text-[#101010] opacity-70">
                            <div className="flex items-start">
                                <input type="checkbox" id="customCheck" className="w-5 h-5 appearance-none border shadow-xl rounded-sm shadow-black border-black/5 mr-1 grid place-content-center"/>
                                <label htmlFor="customCheck" className="">Remember me</label>
                            </div>
                            <div className="">I forgot my password</div>
                        </div>
                        <div className="mt-7 text-[17px]">
                            <input type="submit"  value="LOG IN" className="rounded-md text-white bg-[#6979F8] py-3 w-full"/>
                        </div>
                    </form>
                    <Link to='/signup'>
                        <div className="text-[#182CD1] text-sm mt-9">
                            Don’t have an account? Sign up 
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}