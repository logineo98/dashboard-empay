import React, { FC } from 'react'

// importation icons
import { MdClose } from 'react-icons/md'
import Divider from '../divider/Divider'
import Loading from '../loading/Loading'

type COMPONENT_TYPE = {
    children: JSX.Element
    title: string
    send_btn_name?: string
    close_btn_name?: string
    width?: number
    loading?: boolean
    show_modal_bottom?: boolean
    handleSubmit?: () => void
    error_data?: any
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: FC<COMPONENT_TYPE> = (props) => {
    const { children, setOpenAddModal, title, close_btn_name, error_data, handleSubmit, loading, send_btn_name, show_modal_bottom, width } = props

    const handleCloseModal = () => {
        setOpenAddModal(false)
    }

    return (
        <div className='modal'>
            <div className='overlay'></div>

            <div className='modal_container' style={{ width: width ? width : 512 }}>
                <div className='modal_header'>
                    <h2 className='header_name'> {title} </h2>
                    {!loading && <MdClose className='close_icon' onClick={handleCloseModal} />}
                </div>
                <Divider marginVertical='0' />

                {children}
                <Divider marginVertical='0' />

                {show_modal_bottom && handleSubmit &&
                    <div className='modal_footer'>
                        <button className='close' disabled={loading ? true : false} style={{ cursor: loading ? 'not-allowed' : 'pointer' }} onClick={handleCloseModal}> {close_btn_name ? close_btn_name : 'Fermer'} </button>
                        <button disabled={loading ? true : false} style={{ backgroundColor: loading ? '#8D949E' : '#1877F2', cursor: loading ? 'not-allowed' : 'pointer' }} onClick={handleSubmit}> {loading ? <Loading color='#FFFFFF' width='25' /> : send_btn_name ? send_btn_name : 'Valider'} </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Modal