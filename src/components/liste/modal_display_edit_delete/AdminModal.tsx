import React, { FC, useEffect, useState } from 'react'
import { ADMIN_TYPE, COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import Modal from '../../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'

// importation icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { validation_admin } from '../../../utils/validations'
import { _deleteAdmin, _editAdmin } from '../../../redux/actions/admin.action'
import { displayDate } from '../../../utils/functions'
import Divider from '../../divider/Divider'

type COMPONENT_TYPE = {
    type: string
    row: COLUMN_DATA_TABLE_TYPE
    seeModalDisplayEditDelete: boolean
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminModal: FC<COMPONENT_TYPE> = (props) => {
    const { row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type } = props

    const data: ADMIN_TYPE = { id: '', username: '', name: '', email: '', password: '' }

    const { loadingAdmin, admin } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    const dispatch = useDispatch<any>()

    const [editAdminData, setEditAdminData] = useState(data)
    const [confirmEditPassword, setConfirmEditPassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [err, setErr] = useState<ADMIN_TYPE>()

    const handleSubmit = () => {
        if (type === 'modifier') {
            const { error, initialError } = validation_admin(editAdminData, 'edit', confirmEditPassword)

            if (error.username !== initialError.username || error.name !== initialError.name || error.email !== initialError.email || error.password !== initialError.password) {
                setErr(error)
            } else {
                const { id, username, name, email, password } = editAdminData
                setErr(initialError)

                if (!password) {
                    dispatch(_editAdmin({ id, username: username.trim(), name: name.trim(), email: email.trim() }, setSeeModalDisplayEditDelete))
                } else {
                    dispatch(_editAdmin({ id, username: username.trim(), name: name.trim(), email: email.trim(), password }, setSeeModalDisplayEditDelete))
                }
            }
        } else if (type === 'supprimer') {
            dispatch(_deleteAdmin(row?.id, setSeeModalDisplayEditDelete))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setEditAdminData({ ...editAdminData, [e.target.id]: e.target.value })

    useEffect(() => {
        setEditAdminData({ id: row ? row.id : '', username: row ? row.username : '', name: row ? row.name : '', email: row ? row.email : '', password: '' })
    }, [row])

    return (
        !seeModalDisplayEditDelete ? <></> :
            <>
                {type === 'afficher' &&
                    <Modal title={'Information de l\'administrateur'} setOpenAddModal={setSeeModalDisplayEditDelete}>
                        <div className='modal_content'>
                            <div className='display_information_container'>
                                <div className='display_information'>
                                    <span className='title'>Nom d'utilisateur</span>
                                    <span className='value'> {row?.username} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Nom complet</span>
                                    <span className='value'> {row?.name?.length < 25 ? row?.name : row?.name?.substring(0, 25) + '...'} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Email</span>
                                    <span className='value'> {row?.email?.length < 25 ? row?.email : row?.email?.substring(0, 25) + '...'} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Rôle</span>
                                    <span className='value'> {row?.role === 'Super administrateur' ? row?.role : 'Administrateur'} </span>
                                </div>
                            </div>

                            <Divider marginVertical='0' />

                            <div className='display_information_container' style={{ marginTop: 10, }}>
                                <div className='display_information'>
                                    <span className='title'>Date de création</span>
                                    <span className='value'> {displayDate((new Date(row?.createdAt)).getTime())} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Date de dernière modification</span>
                                    <span className='value'> {displayDate((new Date(row?.updatedAt)).getTime())} </span>
                                </div>
                            </div>
                        </div>
                    </Modal>
                }

                {type === 'modifier' &&
                    <Modal title={'Modification de l\'administrateur'} loading={loadingAdmin} setOpenAddModal={setSeeModalDisplayEditDelete} show_modal_bottom handleSubmit={handleSubmit} error_data={data} setErrorData={setErr}>
                        <div className='modal_content'>
                            <div className='add_edit_input_label_container'>
                                <label htmlFor='username'>Nom d'utilisateur</label>
                                <input type='text' name='username' id='username' value={editAdminData.username} disabled={loadingAdmin} placeholder={'Nom d\'utilisateur'} onChange={handleChange} />
                                {err?.username && <span className='error'> {err?.username} </span>}
                            </div>

                            <div className='add_edit_input_label_container'>
                                <label htmlFor='name'>Nom complet</label>
                                <input type='text' name='name' id='name' value={editAdminData.name} disabled={loadingAdmin} placeholder={'Nom complet'} onChange={handleChange} />
                                {err?.name && <span className='error'> {err?.name} </span>}
                            </div>

                            <div className='add_edit_input_label_container'>
                                <label htmlFor='email'>Email</label>
                                <input type='text' name='email' id='email' value={editAdminData.email} disabled={loadingAdmin} placeholder={'Email'} onChange={handleChange} />
                                {err?.email && <span className='error'> {err?.email} </span>}
                            </div>

                            {confirmEditPassword &&
                                <div className='add_edit_input_label_container'>
                                    <label htmlFor='password'>Mot de passe</label>
                                    <input type={seePassword ? 'text' : 'password'} name='password' id='password' value={editAdminData.password} disabled={loadingAdmin} className='password' placeholder='Mot de passe' onChange={handleChange} />
                                    {seePassword ? <AiOutlineEyeInvisible className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Masquer le mot de passe' /> : <AiOutlineEye className='icon' onClick={() => { setSeePassword(prev => !prev); document.getElementById('password')?.focus() }} title='Afficher le mot de passe' />}
                                    {err?.password && <span className='error'> {err?.password} </span>}
                                </div>
                            }

                            {admin?.id === row?.id &&
                                <div className='edit_password'>
                                    {!confirmEditPassword && <p>Voulez-vous modifier votre mot de passe ? <span className='confirm_edit_password' onClick={() => { setConfirmEditPassword(true); setEditAdminData({ ...editAdminData, password: '' }) }}>OUI</span></p>}
                                    {confirmEditPassword && <p>Voulez-vous modifier votre mot de passe ? <span className='confirm_edit_password' onClick={() => { setConfirmEditPassword(false); setEditAdminData({ ...editAdminData, password: '' }) }}>NON</span></p>}
                                </div>
                            }
                        </div>
                    </Modal>
                }

                {type === 'supprimer' &&
                    <Modal title={'Suppression de l\'administrateur'} loading={loadingAdmin} setOpenAddModal={setSeeModalDisplayEditDelete} show_modal_bottom handleSubmit={handleSubmit} close_btn_name='NON' send_btn_name='OUI'>
                        <div className='modal_content'>
                            <div className='delete_container'>
                                <p className='ask'>
                                    Voulez-vous vraiment supprimer
                                    <span className='name'> {row?.username} </span> ?
                                </p>
                            </div>
                        </div>
                    </Modal>
                }
            </>

    )
}

export default AdminModal