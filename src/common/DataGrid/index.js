/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */

import { DataGrid as MUIDataGrid } from '@mui/x-data-grid';
import { Paper } from "@mui/material"
import Pagination from './Pagination';
import Toolbar from './Toolbar';
import NoRowsOverlay from './NoRowsOverlay';
import { useEffect, useState } from 'react';
import { enmActionType } from './constants';
import { useForm } from "react-hook-form"
import { CastData } from '../../Utils/CastData';

const DataGrid = ({ rows, exRHForm, columns, onDelete, csvFileName, renderForm, onSubmit, deleteAction, insertAction, updateAction, viewAction, onSelectedRowChange, exportToCSV, UniqueRowID, ...props }) => {
    const [selectedRow, setSelectedRow] = useState(null)
    const [actionType, setActionType] = useState(-1)
    const RHFormLib = useForm();
    const RHForm = exRHForm ? exRHForm : RHFormLib;

    useEffect(() => {
        if (selectedRow) {
            Object.keys(selectedRow).forEach(key => RHForm.setValue(key, selectedRow[key]))
        }
        onSelectedRowChange(selectedRow)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRow])

    const lstData = rows.map((item, index) => ({ ...item, id: index + 1 }))
    const lstColumns = columns.map(item => ({ ...item, ...(item?.type === 'dateTime' ? { valueGetter: (val) => new Date(val) } : {}), flex: 1 }))

    const handleCloseCollapse = () => {
        setActionType(-1)
        setSelectedRow(null)
        RHForm.reset()
    }

    const handleFormSubmit = (objData) => {
        const objSubmitData = enmActionType === enmActionType.Add ? { ...objData } : { ...selectedRow, ...objData }
        onSubmit(objSubmitData, actionType)

        handleCloseCollapse()
    }

    const handleActionClick = (intActionType) => {
        setActionType(intActionType)
        if ([enmActionType.Search, enmActionType.Add].includes(intActionType)) {
            setSelectedRow(null)
            RHForm.reset()
        }
    }

    return (
        <Paper sx={{ p: 1 }} elevation={0}>
            <MUIDataGrid
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{
                    noRowsOverlay: NoRowsOverlay,
                    pagination: Pagination,
                    toolbar: Toolbar,
                }}
                slotProps={{
                    toolbar: {
                        hasSelectedRow: Boolean(selectedRow),
                        onActionClicked: handleActionClick,
                        handleDelete: () => onDelete(selectedRow),
                        csvFileName,
                        actionType,
                        renderForm: () => renderForm({ RHForm, selectedRow, actionType }),
                        selectedRow,
                        RHForm,
                        handleCloseCollapse,
                        onSubmit: RHForm.handleSubmit(objFormData => handleFormSubmit(CastData(objFormData))),
                        deleteAction: deleteAction,
                        insertAction: insertAction,
                        updateAction: updateAction,
                        viewAction: viewAction,
                        exportToCSV: exportToCSV
                    }
                }}
                sx={{
                    '--DataGrid-overlayHeight': '300px',
                    ".MuiDataGrid-columnHeader": {
                        backgroundColor: "primary.main",
                        color: "white"
                    },
                }}
                rows={lstData}
                columns={lstColumns}
                onRowSelectionModelChange={([selectedRowId]) => setSelectedRow(lstData.find(row => row.id === selectedRowId))}
                rowSelectionModel={selectedRow?.id || []}
                disableRowSelectionOnClick={actionType !== -1}
                {...props}
            />
        </Paper>
    )
}

DataGrid.defaultProps = {
    rows: [],
    columns: [],
    disableColumnResize: true,
    disableColumnMenu: true,
    autoHeight: true,
    onActionClicked: () => { },
    hideFooterSelectedRowCount: true,
    csvFileName: "CSV",
    renderForm: () => { },
    onDelete: () => { },
    onSubmit: () => { },
    deleteAction: true,
    insertAction: true,
    updateAction: true,
    viewAction: true,
    exportToCSV: false,
    onSelectedRowChange: () => { }
}

export default DataGrid