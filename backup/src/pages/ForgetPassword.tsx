import React, { useState } from 'react'
import LoginForgetContainer from '../components/login_forget/LoginForgetContainer'
import { page_forget_password } from '../utils/page_name'
import Loading from '../components/loading/Loading'
import { Link } from 'react-router-dom'
import { pass_next_or_return_prev } from '../utils/functions'
import { toast } from 'react-toastify'
import { PAGE_COMPONENT_TYPE } from '../utils/types'

// importation icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ForgetPassword: PAGE_COMPONENT_TYPE = () => {
    const loading = false
    const display_options = { search_email_or_username_or_phone: true, write_code_send: false, write_new_password: false, succes_modify_password: false }
    const code_send = { first: '', second: '', third: '', fourth: '', fifth: '' }

    const [light, setLight] = useState(true)
    const [emailOrUsernameOrPhone, setEmailOrUsernameOrPhone] = useState('')
    const [password, setPassword] = useState('')
    const [displayOptions, setDisplayOptions] = useState(display_options)
    const [codeSend, setCodeSend] = useState(code_send)
    const [seePassword, setSeePassword] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (displayOptions.search_email_or_username_or_phone) {
            if (emailOrUsernameOrPhone) {
                console.log(emailOrUsernameOrPhone)
                setDisplayOptions({ search_email_or_username_or_phone: false, write_code_send: true, write_new_password: false, succes_modify_password: false })
            } else {
                toast.warning('Veuillez renseigner le champ !')
            }
        } else if (displayOptions.write_code_send) {
            if (codeSend.first && codeSend.second && codeSend.third && codeSend.fourth && codeSend.fifth) {
                const code = codeSend.first + codeSend.second + codeSend.third + codeSend.fourth + codeSend.fifth

                console.log(code)
                setDisplayOptions({ search_email_or_username_or_phone: false, write_code_send: false, write_new_password: true, succes_modify_password: false })
            } else {
                toast.warning('Veuillez saisir le code réussi !')
            }
        } else if (displayOptions.write_new_password) {
            if (password) {
                console.log(password)
                setDisplayOptions({ search_email_or_username_or_phone: false, write_code_send: false, write_new_password: false, succes_modify_password: true })
            } else {
                toast.warning('Veuillez renseigner le champ !')
            }
        }
    }

    const resendCode = () => {
        toast.warning('Code de renvoie du nouveau code')
    }

    const manageWriteCodeSend = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\D/g, '')

        if (e.target.id === 'first') pass_next_or_return_prev(e, 'second', null, null)

        if (e.target.id === 'second') pass_next_or_return_prev(e, 'third', 'second', 'first')

        if (e.target.id === 'third') pass_next_or_return_prev(e, 'fourth', 'third', 'second')

        if (e.target.id === 'fourth') pass_next_or_return_prev(e, 'fifth', 'fourth', 'third')

        if (e.target.id === 'fifth') pass_next_or_return_prev(e, null, 'fifth', 'fourth')

        setCodeSend({ ...codeSend, [e.target.id]: e.target.value })
    }

    return (
        <LoginForgetContainer title_page={page_forget_password} light={light} setLight={setLight}>
            <form className={light ? 'form_forget_password' : 'form_forget_password dark'} onSubmit={handleSubmit}>
                {displayOptions.search_email_or_username_or_phone &&
                    <div className='search_email_or_username_or_phone_container'>
                        <div className='input_container'>
                            <label htmlFor='email'>Veuillez entrer l'email | nom d'utilisateur | numéro de téléphone</label>
                            <input type='text' name='email' id='email' placeholder={'Email ou nom d\'utilisateur'} value={emailOrUsernameOrPhone} onChange={e => setEmailOrUsernameOrPhone(e.target.value)} />
                        </div>

                        <div className='forget_send_back'>
                            <button className='back'><Link to='/'>ANNULER</Link></button>
                            <button disabled={loading ? true : false} style={{ backgroundColor: loading ? '#8D949E' : '#1877F2', cursor: loading ? 'not-allowed' : 'pointer' }}> {loading ? <Loading color='#FFFFFF' width='25' /> : 'ENVOYER'} </button>
                        </div>
                    </div>
                }

                {displayOptions.write_code_send &&
                    <div className='write_code_send_container'>
                        <div className='input_write_code_send_container'>
                            <label>Veuillez saisir le code reçu</label>
                            <div className='inputs_container'>
                                <input type='text' name='first' id='first' className='number' maxLength={1} value={codeSend.first} onChange={manageWriteCodeSend} />
                                <input type='text' name='second' id='second' className='number' maxLength={1} value={codeSend.second} onChange={manageWriteCodeSend} />
                                <input type='text' name='third' id='third' className='number' maxLength={1} value={codeSend.third} onChange={manageWriteCodeSend} />
                                <input type='text' name='fourth' id='fourth' className='number' maxLength={1} value={codeSend.fourth} onChange={manageWriteCodeSend} />
                                <input type='text' name='fifth' id='fifth' className='number' maxLength={1} value={codeSend.fifth} onChange={manageWriteCodeSend} />
                            </div>
                        </div>

                        <div className='resend_code_container'>
                            <span onClick={resendCode}>Renvoyer le code ?</span>
                        </div>

                        <div className='forget_write_code_send_back'>
                            <button className='back' onClick={() => setDisplayOptions({ search_email_or_username_or_phone: true, write_code_send: false, write_new_password: false, succes_modify_password: false })}>ANNULER</button>
                            <button disabled={loading ? true : false} style={{ backgroundColor: loading ? '#8D949E' : '#1877F2', cursor: loading ? 'not-allowed' : 'pointer' }}> {loading ? <Loading color='#FFFFFF' width='25' /> : 'ENVOYER'} </button>
                        </div>
                    </div>
                }

                {displayOptions.write_new_password &&
                    <div className='write_new_password_container'>
                        <div className='input_container'>
                            <label htmlFor='password'>Veuillez saisir le nouveau mot de passe</label>
                            <input type={seePassword ? 'text' : 'password'} name='password' id='password' className='password' placeholder='Mot de passe' onChange={e => setPassword(e.target.value)} />
                            {seePassword ? <AiOutlineEyeInvisible className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Masquer le mot de passe' /> : <AiOutlineEye className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Afficher le mot de passe' />}
                        </div>

                        <div className='forget_write_new_password_back'>
                            <button className='back' onClick={() => setDisplayOptions({ search_email_or_username_or_phone: false, write_code_send: true, write_new_password: false, succes_modify_password: false })}>ANNULER</button>
                            <button disabled={loading ? true : false} style={{ backgroundColor: loading ? '#8D949E' : '#1877F2', cursor: loading ? 'not-allowed' : 'pointer' }}> {loading ? <Loading color='#FFFFFF' width='25' /> : 'ENREGISTRER'} </button>
                        </div>
                    </div>
                }

                {displayOptions.succes_modify_password &&
                    <div className='succes_modify_password_container'>
                        <p className='message_success_container'>Votre mot de passe a été modifié avec succès, veuillez retourner sur la page de connexion pour vous connecter.</p>

                        <div className='forget_succes_modify_password_back'>
                            <button className='back'><Link to='/'>RETOUR SUR LA PAGE DE CONNEXION</Link></button>
                        </div>
                    </div>
                }
            </form>
        </LoginForgetContainer>
    )
}

export default ForgetPassword