import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Signup(){
    return(
        <div className="flex h-screen justify-center items-center w-full">
            <div className="rounded-xl bg-white w-[90%] lg:w-[609px] lg:h-[574px] py-10 flex flex-col items-center text-center">
                <div className="flex flex-col items-center">
                    <Logo size="" color="dark" />
                    <div className="text-[#101010] md:mt-6 mt-4 text-[15px]">Track all your bank expenses in one place</div>
                </div>
                <div className="mt-10 w-5/6 md:w-auto">
                    <form>
                        <div className="flex flex-col md:flex-row text-sm gap-7">
                            <input type='text' placeholder="First name" className="formInput"/>
                            <input type='text' placeholder="Last name" className="formInput"/>
                        </div>
                        <div className="mt-5">
                            <input type="email" placeholder="email" className="formInput w-full"/>
                        </div>
                        <div className="mt-5">
                            <input type="password" placeholder="password" className="formInput w-full"/>
                        </div>
                        <div className="mt-16 text-[17px]">
                            <input type="submit"  value="GET STARTED" className="rounded-md text-white bg-[#182CD1] py-3 w-full"/>
                        </div>
                    </form>
                    <Link to='/login'>
                        <div className="text-[#182CD1] text-sm mt-9">
                            Already have an account? Sign in
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}