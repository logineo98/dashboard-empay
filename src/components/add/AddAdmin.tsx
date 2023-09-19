import React, { FC, useState } from 'react'
import Modal from '../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../redux/store'
import { ADMIN_TYPE } from '../../utils/types'
import { validation_admin } from '../../utils/validations'
import { _addAdmin } from '../../redux/actions/admin.action'

// importation icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type COMPONENT_TYPE = {
    openAddModal: boolean
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddAdmin: FC<COMPONENT_TYPE> = (props) => {
    const { openAddModal, setOpenAddModal } = props

    const data: ADMIN_TYPE = { username: '', name: '', email: '', password: '' }

    const [addAdminData, setAddAdminData] = useState(data)
    const [seePassword, setSeePassword] = useState(false)
    const [err, setErr] = useState<ADMIN_TYPE>()

    const { loadingAdmin } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    const dispatch = useDispatch<any>()

    const handleSubmit = () => {
        const { error, initialError } = validation_admin(addAdminData, 'add')

        if (error.username !== initialError.username || error.name !== initialError.name || error.email !== initialError.email || error.password !== initialError.password) {
            setErr(error)
        } else {
            const { username, name, email, password } = addAdminData
            setErr(initialError)

            dispatch(_addAdmin({ username: username.trim(), name: name.trim(), email: email.trim(), password }, setAddAdminData))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddAdminData({ ...addAdminData, [e.target.id]: e.target.value })

    return (
        !openAddModal ? <></> :
            <Modal title='Ajout administrateur' loading={loadingAdmin} setOpenAddModal={setOpenAddModal} show_modal_bottom handleSubmit={handleSubmit} error_data={data} setErrorData={setErr}>
                <div className='modal_content'>
                    <div className='add_edit_input_label_container'>
                        <label htmlFor='username'>Nom d'utilisateur</label>
                        <input type='text' name='username' id='username' value={addAdminData.username} disabled={loadingAdmin} placeholder={'Nom d\'utilisateur'} onChange={handleChange} />
                        {err?.username && <span className='error'> {err?.username} </span>}
                    </div>

                    <div className='add_edit_input_label_container'>
                        <label htmlFor='name'>Nom complet</label>
                        <input type='text' name='name' id='name' value={addAdminData.name} disabled={loadingAdmin} placeholder={'Nom complet'} onChange={handleChange} />
                        {err?.name && <span className='error'> {err?.name} </span>}
                    </div>

                    <div className='add_edit_input_label_container'>
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' id='email' value={addAdminData.email} disabled={loadingAdmin} placeholder={'Email'} onChange={handleChange} />
                        {err?.email && <span className='error'> {err?.email} </span>}
                    </div>

                    <div className='add_edit_input_label_container'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type={seePassword ? 'text' : 'password'} name='password' id='password' value={addAdminData.password} disabled={loadingAdmin} className='password' placeholder='Mot de passe' onChange={handleChange} />
                        {seePassword ? <AiOutlineEyeInvisible className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Masquer le mot de passe' /> : <AiOutlineEye className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Afficher le mot de passe' />}
                        {err?.password && <span className='error'> {err?.password} </span>}
                    </div>
                </div>
            </Modal>
    )
}

export default AddAdmin