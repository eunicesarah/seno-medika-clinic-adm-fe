'use client';
import React, {useState} from 'react'
import Image from "next/image";
import Pattern from '../../../public/images/pattern.svg';
import axios from "axios";


const loginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
    const validateEmail = (email:any) => {
        var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (validateEmail(email)===false) {
        setError( 'Emaill tidak valid');
        } 
    else {
        setError(''); 
        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            console.log(response);
            if (response.status === 200) {
              console.log("User created");
              location.href = "/byee";
            }
          }
          catch (error) {
            console.log(error);
          }
        }
};

return (
    <div className='h-screen w-full flex flex-row bg-tint6 text-shade6'>
        <div className='w-auto h-screen'>
            <Image src={Pattern} alt="Pattern" className='' priority={true}/>
        </div>
        <div className="flex flex-col gap-18 items-center justify-center w-full rounded-lg">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 gap-18">
                <h1 className=" text-center text-2xl font-bold leading-tight tracking-tight text-gray-900  ">
                    MASUK
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="pl-4 mb-1 block text-l font-medium text-shade6 ">E-mail</label>
                            <input type="email" name="email" id="email" className="bg-tint7 text-gray-900 w-[428px] h-[47px] pl-4 py-[18px] rounded-[18px] border border-neutral-200 justify-start items-center gap-2.5 text-md" placeholder="Masukkan e-mail anda"  value={formData.email} onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                } />
                            {error && <span className="text-red-500 pl-4 text-xs pt-1">{error}</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password" className="block mb-1 pl-4 text-l font-medium text-shade6 ">Kata Sandiaga</label>
                            <input type="password" name="password" id="password" className="bg-tint7 text-gray-900 w-[428px] h-[47px] pl-4 py-[18px] rounded-[18px] border border-neutral-200 justify-start items-center gap-2.5 text-md" placeholder="Masukkan kata sandi anda" value={formData.password} onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                } />
                            {error && <span className="text-red-500 pl-4 text-xs pt-1">{error}</span>}
                        </div>
                        <p className="text-sm font-light text-shade6 ">
                            *) untuk pembuatan akun silahkan <span className="font-bold">menghubungi super admin</span>
                        </p>
                        <div className="flex items-center justify-center text-center">
                            <button type="submit" className="flex w-[230px] h-11 px-[67px] py-2.5 rounded-3xl justify-center items-center gap-2.5  text-white bg-primary1 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-lg text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >
                            <p className="justify-center">Login</p></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
}

export default loginPage