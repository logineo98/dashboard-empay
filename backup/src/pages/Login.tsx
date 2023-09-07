import React, { useState } from 'react'
import { page_connexion } from '../utils/page_name'
import LoginForgetContainer from '../components/login_forget/LoginForgetContainer'
import { Link } from 'react-router-dom'
import Loading from '../components/loading/Loading'
import { PAGE_COMPONENT_TYPE } from '../utils/types'
import { toast } from 'react-toastify'
import axios from 'axios'

// importation icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { admin } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../redux/store'
import { _errorAdmin, _loadingAdmin } from '../redux/actions/admin.action'

const Login: PAGE_COMPONENT_TYPE = () => {
    const data = { username: '', password: '' }

    const [light, setLight] = useState(true)
    const [seePassword, setSeePassword] = useState(false)
    const [loginData, setLoginData] = useState(data)

    const { loadingAdmin } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (loginData.username && loginData.password) {
            dispatch(_loadingAdmin())

            axios.post(`${admin}/login`, loginData)
                .then(res => {
                    console.log(res.data)
                    const now = new Date()
                    const deconnectionHour = new Date(now.getTime() + res.data.expiresIn)

                    localStorage.setItem('token', res.data.accessToken)
                    localStorage.setItem('expiration_date', deconnectionHour.getTime().toString())
                    localStorage.setItem('admin', JSON.stringify(res.data?.admin))

                    window.location.href = '/'
                })
                .catch(error => {
                    toast.error(error?.response?.data)
                    dispatch(_errorAdmin(error?.response?.data))
                })
        } else {
            toast.warning('Veuillez renseigner les deux champs !')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }

    return (
        <LoginForgetContainer title='login' title_page={page_connexion} light={light} setLight={setLight}>
            <form className={light ? 'form_login' : 'form_login dark'} onSubmit={handleSubmit}>
                <div className='input_container'>
                    <label htmlFor='username'>Nom d'utilisateur | Email</label>
                    <input type='text' name='username' id='username' placeholder={'Nom d\'utilisateur | Email'} onChange={handleChange} />
                </div>

                <div className='input_container'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input type={seePassword ? 'text' : 'password'} name='password' id='password' className='password' placeholder='Mot de passe' onChange={handleChange} />
                    {seePassword ? <AiOutlineEyeInvisible className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Masquer le mot de passe' /> : <AiOutlineEye className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Afficher le mot de passe' />}
                </div>

                <div className='remember_forget_password'>
                    <label htmlFor='remember'>
                        <input type='checkbox' name='remember' id='remember' /> Souvenir de moi
                    </label>

                    <Link to='/forget_password'>Mot de passe oublié ?</Link>
                </div>

                <div className='connexion'>
                    <button disabled={loadingAdmin ? true : false} style={{ backgroundColor: loadingAdmin ? '#8D949E' : '#1877F2', cursor: loadingAdmin ? 'not-allowed' : 'pointer' }}> {loadingAdmin ? <Loading color='#FFFFFF' width='25' /> : 'CONNEXION'} </button>
                </div>
            </form>
        </LoginForgetContainer>
    )
}

export default Login