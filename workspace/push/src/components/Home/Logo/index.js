import './index.scss';
import Lottie from "lottie-react";
import animationData from "../../../assets/animations/anim_guy.json";

const Logo = () => {
    return (
        <div className='logo-container'>
            <Lottie className="logo" animationData={animationData} />
        </div>
    )
}

export default Logo;