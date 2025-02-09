import Image from 'next/image'
import logo from '/public/logo-big.svg'

const Logo = () => {
  return (
    <div className='logo'>
        <Image src={logo} alt="logo"/>
        <p className='text-2xl uppercase ml-4'>stemps</p>
    </div>
)};

export default Logo;