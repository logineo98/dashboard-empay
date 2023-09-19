import React, { FC, useEffect, useState } from 'react'
import { COLUMN_DATA_TABLE_TYPE, PARTNER_TYPE } from '../../../utils/types'
import Modal from '../../modal/Modal'
import Divider from '../../divider/Divider'
import { api_img } from '../../../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'
import { validation_partner } from '../../../utils/validations'
import { _deletePartner, _editPartner } from '../../../redux/actions/partner.action'
import { displayDate } from '../../../utils/functions'

type COMPONENT_TYPE = {
    type: string
    row: COLUMN_DATA_TABLE_TYPE
    seeModalDisplayEditDelete: boolean
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const PartnerModal: FC<COMPONENT_TYPE> = (props) => {
    const { row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type } = props

    const data: PARTNER_TYPE = { id: '', name: '', description: '', logo: '' }

    const { loadingPartner } = useSelector((state: ROOT_REDUCER_TYPE) => state.partner)
    const dispatch = useDispatch<any>()

    const [editPartner, setEditPartner] = useState(data)
    const [previewImg, setPreviewImg] = useState<string | File>('')
    const [err, setErr] = useState<PARTNER_TYPE>()

    const handleSubmit = () => {
        if (type === 'modifier') {
            const { error, initialError } = validation_partner(editPartner)

            if (error.logo !== initialError.logo || error.name !== initialError.name || error.description !== initialError.description) {
                setErr(error)
            } else {
                setErr(initialError)

                const { id, logo, name, description } = editPartner

                const data = new FormData()
                data.append('name', name)
                data.append('description', description)
                if (typeof logo !== 'string') data.append('logo', logo)

                id && dispatch(_editPartner(id, data, setSeeModalDisplayEditDelete))
            }
        } else if (type === 'supprimer') {
            dispatch(_deletePartner(row?.id, setSeeModalDisplayEditDelete))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setEditPartner({ ...editPartner, [e.target.id]: e.target.value })

    const handleChangeLogoImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
            setEditPartner({ ...editPartner, logo: e.target.files[0] })
        } else {
            setPreviewImg('')
            setEditPartner({ ...editPartner, logo: row?.logo })
        }
    }

    useEffect(() => {
        setEditPartner({ id: row ? row.id : '', name: row ? row.name : '', description: row ? row.description : '', logo: row ? row.logo : '', })
        type === 'modifier' && setPreviewImg('')
    }, [row])

    return (
        !seeModalDisplayEditDelete ? <></> :
            <>
                {type === 'afficher' &&
                    <Modal title='Information du partenaire' setOpenAddModal={setSeeModalDisplayEditDelete}>
                        <div className='modal_content'>
                            <div className='display_information_container'>
                                <div className='display_information w_100'>
                                    <span className='title'>Logo</span>
                                    <div className='img_container'>
                                        <img src={`${api_img}/${row?.logo}`} alt='image_logo_partenaire' />
                                    </div>
                                </div>
                            </div>

                            <Divider marginVertical='0' />

                            <div className='display_information_container' style={{ marginTop: 10, }}>
                                <div className='display_information w_100'>
                                    <span className='title'>Nom</span>
                                    <span className='value'> {row?.name} </span>
                                </div>

                                <div className='display_information w_100'>
                                    <span className='title'>Description</span>
                                    <span className='value'> {row?.description} </span>
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
                    <Modal title='Modification du partenaire' loading={loadingPartner} setOpenAddModal={setSeeModalDisplayEditDelete} show_modal_bottom handleSubmit={handleSubmit} close_btn_name='Annuler' error_data={data} setErrorData={setErr}>
                        <div className='modal_content'>
                            <div className='add_edit_file_label_container'>
                                <label>Logo</label>
                                {previewImg ?
                                    <label htmlFor='logo' className='preview_img_container'>
                                        <img src={previewImg as string} alt='logo_partner' />
                                    </label> :
                                    <label htmlFor='logo' className='img_container'>
                                        <img src={`${api_img}/${row?.logo}`} alt='logo_partner' />
                                    </label>
                                }
                                {!loadingPartner &&
                                    <div className='choose_logo_cancel_container'>
                                        <label htmlFor='logo' className='choose_logo'>Choisir une logo
                                            <input type='file' accept='.jpg, .jpeg, .png' name='logo' id='logo' onChange={handleChangeLogoImg} />
                                        </label>
                                        {previewImg && <label className='cancel' onClick={() => { setPreviewImg(''); setEditPartner({ ...editPartner, logo: row?.logo }) }}>Annuler</label>}
                                    </div>
                                }

                                {err?.logo && <span className='error'> {err?.logo as string} </span>}
                            </div>

                            <Divider marginVertical='10' />

                            <div className='add_edit_input_label_container'>
                                <label htmlFor='name'>Nom</label>
                                <input type='text' name='name' id='name' value={editPartner.name} disabled={loadingPartner} placeholder='Nom' onChange={handleChange} />
                                {err?.name && <span className='error'> {err?.name} </span>}
                            </div>

                            <div className='add_edit_input_label_container'>
                                <label htmlFor='description'>Description</label>
                                <textarea name='description' id='description' value={editPartner.description} disabled={loadingPartner} placeholder='Description' onChange={handleChange}></textarea>
                                {err?.description && <span className='error'> {err?.description} </span>}
                            </div>
                        </div>
                    </Modal>
                }

                {type === 'supprimer' &&
                    <Modal title='Suppression du partenaire' loading={loadingPartner} setOpenAddModal={setSeeModalDisplayEditDelete} show_modal_bottom handleSubmit={handleSubmit} close_btn_name='NON' send_btn_name='OUI'>
                        <div className='modal_content'>
                            <div className='delete_container'>
                                <p className='ask'>
                                    Voulez-vous vraiment supprimer
                                    <span className='name'> {row?.name} </span> ?
                                </p>
                            </div>
                        </div>
                    </Modal>
                }
            </>
    )
}

export default PartnerModal