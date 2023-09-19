import React, { FC, useState } from 'react'
import { TARIF_TYPE } from '../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../redux/store'
import Modal from '../modal/Modal'
import { validation_tarif } from '../../utils/validations'
import { _addTarif } from '../../redux/actions/tarif.action'

type COMPONENT_TYPE = {
    openAddModal: boolean
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTarif: FC<COMPONENT_TYPE> = (props) => {
    const { openAddModal, setOpenAddModal } = props

    const data: TARIF_TYPE = { tarif: '', description: '' }

    const [addTarifData, setAddTarifData] = useState(data)
    const [err, setErr] = useState<TARIF_TYPE>()

    const { loadingTarif } = useSelector((state: ROOT_REDUCER_TYPE) => state.tarif)
    const dispatch = useDispatch<any>()

    const handleSubmit = () => {
        const { error, initialError } = validation_tarif(addTarifData)

        if (error.tarif !== initialError.tarif || error.description !== initialError.description) {
            setErr(error)
        } else {
            setErr(initialError)

            const { tarif, description } = addTarifData

            dispatch(_addTarif({ tarif: tarif.trim(), description: description.trim() }, setAddTarifData))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setAddTarifData({ ...addTarifData, [e.target.id]: e.target.value })

    return (
        !openAddModal ? <></> :
            <Modal title='Ajout tarif' loading={loadingTarif} setOpenAddModal={setOpenAddModal} show_modal_bottom handleSubmit={handleSubmit} error_data={data} setErrorData={setErr}>
                <div className='modal_content'>
                    <div className='add_edit_input_label_container'>
                        <label htmlFor='tarif'>Tarif</label>
                        <input type='text' name='tarif' id='tarif' value={addTarifData.tarif} disabled={loadingTarif} placeholder={'Tarif'} onChange={handleChange} />
                        {err?.tarif && <span className='error'> {err?.tarif} </span>}
                    </div>

                    <div className='add_edit_input_label_container'>
                        <label htmlFor='description'>Description</label>
                        <textarea name='description' id='description' value={addTarifData.description} disabled={loadingTarif} placeholder='Description' onChange={handleChange}></textarea>
                        {err?.description && <span className='error'> {err?.description} </span>}
                    </div>
                </div>
            </Modal>
    )
}

export default AddTarif