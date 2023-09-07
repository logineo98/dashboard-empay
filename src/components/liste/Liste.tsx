import React, { FC, useState } from 'react'
import DataTable from 'react-data-table-component'
import HautListe from './haut_liste/HautListe'
import NoFilteredDataSearch from './NoFilteredDataSearch'

type COMPONENT_TYPE<T, K> = {
    title: string
    data: T[]
    columns: K[]
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Liste: FC<COMPONENT_TYPE<any, any>> = (props) => {
    const { title, data, columns, setOpenAddModal } = props

    const [filteredDataSearch, setFilteredDataSearch] = useState<Array<any>>([])

    return (
        <div className='liste'>
            <HautListe title={title} setOpenAddModal={setOpenAddModal} data={data} setFilteredDataSearch={setFilteredDataSearch} />

            <DataTable columns={columns} data={filteredDataSearch}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 15, 20, 25, 30]}
                paginationComponentOptions={{ rowsPerPageText: 'Ligne par page', rangeSeparatorText: 'de' }}

                highlightOnHover

                noDataComponent={<NoFilteredDataSearch title={title} />}

                customStyles={{
                    headRow: { style: { borderTop: '1px solid #d3d3d3', borderLeft: '1px solid #d3d3d3', borderRight: '1px solid #d3d3d3', borderTopLeftRadius: 5, borderTopRightRadius: 5, } },
                    rows: { style: { borderRight: '1px solid #d3d3d3', borderLeft: '1px solid #d3d3d3' } },
                    pagination: { style: { borderLeft: '1px solid #d3d3d3', borderBottom: '1px solid #d3d3d3', borderRight: '1px solid #d3d3d3', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, } },

                }}
            />
        </div>
    )
}

export default Liste