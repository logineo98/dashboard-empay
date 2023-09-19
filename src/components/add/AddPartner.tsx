import React, { FC, useState } from 'react'
import Modal from '../modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../redux/store'
import { PARTNER_TYPE } from '../../utils/types'
import Divider from '../divider/Divider'
import { validation_partner } from '../../utils/validations'
import { _addPartner } from '../../redux/actions/partner.action'

type COMPONENT_TYPE = {
    openAddModal: boolean
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddPartner: FC<COMPONENT_TYPE> = (props) => {
    const { openAddModal, setOpenAddModal } = props

    const data: PARTNER_TYPE = { logo: '', name: '', description: '' }

    const [addPartnerData, setAddPartnerData] = useState(data)
    const [previewImg, setPreviewImg] = useState<string | File>('')
    const [err, setErr] = useState<PARTNER_TYPE>()

    const { loadingPartner } = useSelector((state: ROOT_REDUCER_TYPE) => state.partner)
    const dispatch = useDispatch<any>()

    const handleSubmit = () => {
        const { error, initialError } = validation_partner(addPartnerData)

        if (error.logo !== initialError.logo || error.name !== initialError.name || error.description !== initialError.description) {
            setErr(error)
        } else {
            setErr(initialError)

            const { logo, name, description } = addPartnerData

            const data = new FormData()
            data.append('name', name)
            data.append('description', description)
            data.append('logo', logo)

            dispatch(_addPartner(data, setAddPartnerData, setPreviewImg))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setAddPartnerData({ ...addPartnerData, [e.target.id]: e.target.value })

    const handleChangeLogoImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
            setAddPartnerData({ ...addPartnerData, logo: e.target.files[0] })
        } else {
            setPreviewImg('')
            setAddPartnerData({ ...addPartnerData, logo: '' })
        }
    }

    return (
        !openAddModal ? <></> :
            <Modal title='Ajout partenaire' loading={loadingPartner} setOpenAddModal={setOpenAddModal} show_modal_bottom handleSubmit={handleSubmit} close_btn_name='Annuler' error_data={data} setErrorData={setErr}>
                <div className='modal_content'>
                    <div className='add_edit_file_label_container'>
                        <label>Logo</label>
                        {previewImg &&
                            <label htmlFor='logo' className='preview_img_container'>
                                <img src={previewImg as string} alt='logo_partner' />
                            </label>
                        }
                        {!loadingPartner &&
                            <div className='choose_logo_cancel_container'>
                                <label htmlFor='logo' className='choose_logo'>Choisir une logo
                                    <input type='file' accept='.jpg, .jpeg, .png' name='logo' id='logo' onChange={handleChangeLogoImg} />
                                </label>
                                {previewImg && <label className='cancel' onClick={() => { setPreviewImg(''); setAddPartnerData({ ...addPartnerData, logo: '' }) }}>Annuler</label>}
                            </div>
                        }
                        {err?.logo && <span className='error'> {err?.logo as string} </span>}
                    </div>

                    <Divider marginVertical='10' />

                    <div className='add_edit_input_label_container'>
                        <label htmlFor='name'>Nom</label>
                        <input type='text' name='name' id='name' value={addPartnerData.name} disabled={loadingPartner} placeholder='Nom du partenaire' onChange={handleChange} />
                        {err?.name && <span className='error'> {err?.name} </span>}
                    </div>

                    <div className='add_edit_input_label_container'>
                        <label htmlFor='description'>Description</label>
                        <textarea name='description' id='description' value={addPartnerData.description} disabled={loadingPartner} placeholder='Description' onChange={handleChange}></textarea>
                        {err?.description && <span className='error'> {err?.description} </span>}
                    </div>
                </div>
            </Modal>
    )
}

export default AddPartner