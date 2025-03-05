import logo from './Img/logo.png'

export default function LogoLayout(props) {
    return (
       <img src={logo} alt="Logo" decoding="async" loading="lazy" className='w-36 '/>
    );
}
