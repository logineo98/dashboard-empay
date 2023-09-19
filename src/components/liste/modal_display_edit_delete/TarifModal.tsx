import React, { FC, useEffect, useState } from 'react'
import { COLUMN_DATA_TABLE_TYPE, TARIF_TYPE } from '../../../utils/types'
import Modal from '../../modal/Modal'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { validation_tarif } from '../../../utils/validations'
import { _deleteTarif, _editTarif } from '../../../redux/actions/tarif.action'
import Divider from '../../divider/Divider'
import { displayDate } from '../../../utils/functions'

type COMPONENT_TYPE = {
    type: string
    row: COLUMN_DATA_TABLE_TYPE
    seeModalDisplayEditDelete: boolean
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const TarifModal: FC<COMPONENT_TYPE> = (props) => {
    const { row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type } = props

    const data: TARIF_TYPE = { id: '', tarif: '', description: '' }

    const { loadingTarif } = useSelector((state: ROOT_REDUCER_TYPE) => state.tarif)
    const dispatch = useDispatch<any>()

    const [editTarifData, setEditTarifData] = useState(data)
    const [err, setErr] = useState<TARIF_TYPE>()

    const handleSubmit = () => {
        if (type === 'modifier') {
            const { error, initialError } = validation_tarif(editTarifData)

            if (error.tarif !== initialError.tarif || error.description !== initialError.description) {
                setErr(error)
            } else {
                setErr(initialError)

                const { id, tarif, description } = editTarifData

                id && dispatch(_editTarif(id, { tarif: tarif.trim(), description: description.trim() }, setSeeModalDisplayEditDelete))
            }
        } else if (type === 'supprimer') {
            dispatch(_deleteTarif(row?.id, setSeeModalDisplayEditDelete))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setEditTarifData({ ...editTarifData, [e.target.id]: e.target.value })

    useEffect(() => {
        setEditTarifData({ id: row ? row.id : '', tarif: row ? row.tarif : '', description: row ? row.description : '' })
    }, [row])

    return (
        !seeModalDisplayEditDelete ? <></> :
            <>
                {type === 'afficher' &&
                    <Modal title='Information du tarif' setOpenAddModal={setSeeModalDisplayEditDelete}>
                        <div className='modal_content'>
                            <div className='display_information_container'>
                                <div className='display_information w_100'>
                                    <span className='title'>Tarif</span>
                                    <span className='value'> {row?.tarif} </span>
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
                    <Modal title='Modification du partenaire' loading={loadingTarif} setOpenAddModal={setSeeModalDisplayEditDelete} show_modal_bottom handleSubmit={handleSubmit} close_btn_name='Annuler' error_data={data} setErrorData={setErr}>
                        <div className='modal_content'>
                            <div className='add_edit_input_label_container'>
                                <label htmlFor='tarif'>Tarif</label>
                                <input type='text' name='tarif' id='tarif' value={editTarifData.tarif} disabled={loadingTarif} placeholder='Tarif' onChange={handleChange} />
                                {err?.tarif && <span className='error'> {err?.tarif} </span>}
                            </div>

                            <div className='add_edit_input_label_container'>
                                <label htmlFor='description'>Description</label>
                                <textarea name='description' id='description' value={editTarifData.description} disabled={loadingTarif} placeholder='Description' onChange={handleChange}></textarea>
                                {err?.description && <span className='error'> {err?.description} </span>}
                            </div>
                        </div>
                    </Modal>
                }

                {type === 'supprimer' &&
                    <Modal title='Suppression du tarif' loading={loadingTarif} setOpenAddModal={setSeeModalDisplayEditDelete} show_modal_bottom handleSubmit={handleSubmit} close_btn_name='NON' send_btn_name='OUI'>
                        <div className='modal_content'>
                            <div className='delete_container'>
                                <p className='ask'>
                                    Voulez-vous vraiment supprimer
                                    <span className='name'> {row?.tarif} </span> ?
                                </p>
                            </div>
                        </div>
                    </Modal>
                }
            </>
    )
}

export default TarifModal