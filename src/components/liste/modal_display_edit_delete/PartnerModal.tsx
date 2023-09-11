import React, { FC, useEffect, useState } from 'react'
import { COLUMN_DATA_TABLE_TYPE, PARTNER_TYPE } from '../../../utils/types'
import Modal from '../../modal/Modal'
import Divider from '../../divider/Divider'
import { api_img } from '../../../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setEditPartner({ ...editPartner, [e.target.id]: e.target.value })

    // {
    //     setEditPartner({ ...editPartner, logo: e.target.files ? e.target.files[0] : '' });
    //     if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); }
    //     else { setPreviewImg('') }
    // }

    const handleChangeLogoImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
        } else {
            setPreviewImg('')
        }
    }
    console.log('previewImg', previewImg)

    useEffect(() => {
        setEditPartner({ id: row ? row.id : '', name: row ? row.name : '', description: row ? row.description : '', logo: row ? row.logo : '', })
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
                        </div>
                    </Modal>
                }

                {type === 'modifier' &&
                    <Modal title='Modification du partenaire' setOpenAddModal={setSeeModalDisplayEditDelete}>
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
                                <div className='choose_logo_cancel_container'>
                                    <label htmlFor='logo' className='choose_logo'>Choisir une logo
                                        <input type='file' accept='.jpg, .jpeg, .png' name='logo' id='logo' onChange={handleChangeLogoImg} />
                                    </label>
                                    <label className='cancel' onClick={() => setPreviewImg('')}>Annuler</label>
                                </div>

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
            </>
    )
}

export default PartnerModal