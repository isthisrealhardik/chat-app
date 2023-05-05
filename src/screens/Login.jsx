import { loginHandle } from "../../firebase/config";

const Login = () => {
    return (
        <div>
            <h1 className="font-sans font-bold text-6xl leading-[70px] text-secondary my-8">Aiye <span className="text-middle underline">Vaartalab</span> Karenge?</h1>
            <button className="bg-middle text-secondary font-semibold" onClick={loginHandle} >Sign in With Google</button>
        </div>
    )
}

export default Login;