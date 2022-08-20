import logo from '../assets/logo.svg'
interface props{
    color: 'dark' | 'light'
    size: string
}
function Logo({ size, color}: props){
    return(
        <div className={`${size}`}>
            {
                color === 'dark' ? 
                <img src={logo} alt="Mono Logo" className='' />:
                <img src={logo} alt="Mono Logo" className='' />
            }
        </div>
    )
}

export default Logo