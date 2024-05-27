'use client'
import Image from 'next/image'
import LoginRegisterImg from '../../../src/assets/LoginRegistrationImg/LoginRegisterImg.png'
import { useUserLoginMutation, useUserRegisterMutation } from '@/service/features/apiSlice';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



const LoginRegister = () => {

    const [dataRegister, setDataRegister] = useState({ username: '', email: '', password: '' })
    const [dataLogin, setDataLogin] = useState({ username: '', password: '' })

    const [createUser] = useUserRegisterMutation()
    const [loginUser] = useUserLoginMutation()
    console.log(loginUser, 'afaeff')
    const [haveAccount, setHaveAccount] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);


    const route = useRouter()
    async function handleSubmit(e) {


        e.preventDefault()

        if (haveAccount === true) {

            loginUser(dataLogin).unwrap().then((res) => {
                console.log(res)
                Cookies.set('token', res.access)
                route.push('/Home')
            }


            )
            setLoggedIn(true);

        }
        else {
            createUser(dataRegister)
            setHaveAccount(true);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-row w-[100vw] h-[100vh]'>
                <div className="h-full w-1/2 flex justify-center items-start text-white p-10 transform  "
                    style={{
                        backgroundImage: `url(${LoginRegisterImg.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    <h1 className='text-6xl font-semibold leading-tight text-[#D6EEFF]'>
                        Let`s start<br />your journey<br />to well-being
                    </h1>
                </div>

                <div className="flex flex-col w-[50%] items-center justify-center">

                    {haveAccount ? (
                        <div className='flex flex-col w-[500px] '>
                            <h1 className='text-[54px] font-semibold mb-[36px]'>Авторизація</h1>
                            <p className=' font-light'>User Name / Ім`я користувача</p>
                            <input value={dataLogin.username} required onChange={(e) => setDataLogin({ ...dataLogin, username: e.target.value })} className="px-[10px] py-[10px] border border-black rounded-[10px] mt-[8px] mb-[36px]" type="text" name="username" placeholder='admin' />
                            <p className='font-light'>Password / Пароль</p>
                            <input value={dataLogin.password} required onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} className="px-[10px] py-[10px] border border-black rounded-[10px] mt-[8px] mb-[50px]" type="password" name="password" placeholder='*****' />
                            <button type='submit' className='py-[10px] bg-[#00AFFF] text-white font-bold rounded-[10px]'>Увійти</button>

                        </div>
                    ) : (
                        <div className='flex flex-col w-[500px] '>
                            <h1 className='text-[54px] font-semibold mb-[36px]'>Реєстрація</h1>
                            <p className=' font-light'>User Name / Ім`я користувача</p>
                            <input value={dataRegister.username} required onChange={(e) => setDataRegister({ ...dataRegister, username: e.target.value })} className="px-[10px] py-[10px] border border-black rounded-[10px] mt-[8px] mb-[36px]" type="text" name="username" placeholder='admin' />
                            <p className='font-light'>User Email / Емеіл користувача </p>
                            <input value={dataRegister.email} required onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })} className="px-[10px] py-[10px] border border-black rounded-[10px] mt-[8px] mb-[36px]" type="email" name="email" placeholder='your email' />
                            <p className='font-light'>Password / Пароль</p>
                            <input value={dataRegister.password} required onChange={(e) => setDataRegister({ ...dataRegister, password: e.target.value })} className="px-[10px] py-[10px] border border-black rounded-[10px] mt-[8px] mb-[50px]" type="password" name="password" placeholder='*****' />
                            <button type='submit' className='py-[10px] border border-black rounded-[10px]'>Реєстрація</button>

                        </div>
                    )}

                    <div><h1 onClick={() => setHaveAccount(!haveAccount)}>{haveAccount ? 'register' : 'already have account?'}</h1></div>
                </div>
            </div>
        </form >
    )
}

export default LoginRegister


