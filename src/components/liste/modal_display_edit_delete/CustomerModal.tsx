import React, { FC } from 'react'
import { COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import Modal from '../../modal/Modal'
import Divider from '../../divider/Divider'
import { displayDate } from '../../../utils/functions'
import { useDispatch, useSelector } from 'react-redux'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'
import { _activated_or_unactivated_account_customer } from '../../../redux/actions/customer.action'
import { api_img } from '../../../redux/constants'

type COMPONENT_TYPE = {
    type: string
    row: COLUMN_DATA_TABLE_TYPE
    seeModalDisplayEditDelete: boolean
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomerModal: FC<COMPONENT_TYPE> = (props) => {
    const { row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, type } = props

    const { loadingCustomer } = useSelector((state: ROOT_REDUCER_TYPE) => state.customer)
    const dispatch = useDispatch<any>()

    const handleSubmit = () => {
        dispatch(_activated_or_unactivated_account_customer({ id: row?.id, status: row?.status ? false : true }, setSeeModalDisplayEditDelete))
    }

    return (
        !seeModalDisplayEditDelete ? <></> :
            <>
                {type === 'afficher' &&
                    <Modal title={'Information du client'} setOpenAddModal={setSeeModalDisplayEditDelete}>
                        <div className='modal_content'>
                            <div className='display_information_container' style={{ marginTop: 10, }}>
                                <div className='display_information'>
                                    <span className='title'>Photo de profil</span>
                                    <div className='img_container'>
                                        <img src={`${api_img}/${row?.photo}`} alt='Photo_de_profil' />
                                    </div>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Pièce d'identité</span>
                                    <div className='img_container'>
                                        <img src={`${api_img}/${row?.document}`} alt='Photo_de_piece_identite' />
                                    </div>
                                </div>
                            </div>

                            <Divider marginVertical='0' />

                            <div className='display_information_container' style={{ marginTop: 10, }}>
                                <div className='display_information'>
                                    <span className='title'>Compte UBA</span>
                                    <span className='value'> {row?.accountUBA} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>État du compte</span>
                                    <span className='value'> {row?.status ? 'Activé' : 'Non activé'} </span>
                                </div>
                            </div>

                            <Divider marginVertical='0' />

                            <div className='display_information_container' style={{ marginTop: 10, }}>
                                <div className='display_information'>
                                    <span className='title'>Nom</span>
                                    <span className='value'> {row?.name} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Prénom</span>
                                    <span className='value'> {row?.firstname} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Email</span>
                                    <span className='value'> {row?.email?.length < 25 ? row?.email : row?.email?.substring(0, 25) + '...'} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Téléphone</span>
                                    <span className='value'> {row?.phone} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Date de naissance</span>
                                    <span className='value'> {displayDate((new Date(row?.birthday)).getTime())} </span>
                                </div>

                                <div className='display_information'>
                                    <span className='title'>Adresse</span>
                                    <span className='value'> {row?.address} </span>
                                </div>
                            </div>

                            <Divider marginVertical='0' />

                            <div className='display_information_container' style={{ marginTop: 10, }}>
                                <div className='display_information w_100'>
                                    <span className='title'>Signature du client</span>
                                    <div className='img_container'>
                                        <img src={`${api_img}/${row?.signature}`} alt='Signature_du_client' />
                                    </div>
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

                {type === 'activer_ou_desactiver' &&
                    <Modal title={row?.status ? 'Désactiver le compte du client' : 'Activer le compte du client'} loading={loadingCustomer} setOpenAddModal={setSeeModalDisplayEditDelete} show_modal_bottom handleSubmit={handleSubmit} send_btn_name={row?.status ? 'Désactiver' : 'Activer'}>
                        <div className='modal_content'>
                            <div className='activate_or_unactivate_container'>
                                <p className='ask'>
                                    Voulez-vous vraiment {row?.status ? 'désactiver' : 'activer'} le compte UBA de <br />
                                    <span className='name'> {row?.name} {row?.firstname} </span> ?
                                </p>
                            </div>
                        </div>
                    </Modal>
                }
            </>
    )
}

export default CustomerModal