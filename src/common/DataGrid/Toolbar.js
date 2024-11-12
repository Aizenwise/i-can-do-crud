/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { AddTwoTone, EditTwoTone, DeleteTwoTone, FileDownloadTwoTone } from "@mui/icons-material";
import { enmActionType } from './constants';
import { useTranslation } from "react-i18next"
import Collapse from '@mui/material/Collapse';
import { Grid } from '@mui/material';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const Toolbar = ({ onActionClicked, handleDelete, hasSelectedRow, csvFileName, actionType, renderForm, handleCloseCollapse, onSubmit, deleteAction, insertAction, updateAction, exportToCSV }) => {
    const { t } = useTranslation()
    const apiRef = useGridApiContext();
    const [deleteConfOpen, setDeleteConfOpen] = useState(false)
    const handleExport = (options) => apiRef.current.exportDataAsCsv({ ...options, fileName: csvFileName });

    const handleDeleteConfirm = () => {
        handleDelete();
        setDeleteConfOpen(false);
    }

    return (
        <>
            <GridToolbarContainer>
                {actionType === -1 && (
                    <>
                        <Tooltip title={t('strAdd')}>
                            {insertAction &&
                                <IconButton color="primary" onClick={() => onActionClicked(enmActionType.Add)}  ><AddTwoTone /></IconButton>
                            }
                        </Tooltip>
                        <Tooltip title={t('strEdit')}>
                            {updateAction &&
                                <IconButton color="primary" disabled={!hasSelectedRow} onClick={() => onActionClicked(enmActionType.Edit)}  ><EditTwoTone /></IconButton>
                            }
                        </Tooltip>
                        <Tooltip title={t('strDelete')}>
                            {deleteAction &&
                                <IconButton color="primary" disabled={!hasSelectedRow} onClick={() => { setDeleteConfOpen(true) }}  ><DeleteTwoTone /></IconButton>
                            }
                        </Tooltip>
                        <Tooltip title={t('strExport')}>
                            {exportToCSV &&
                                <IconButton color="primary" onClick={handleExport}  ><FileDownloadTwoTone /></IconButton>
                            }
                        </Tooltip>
                    </>
                )}
                {actionType !== -1 && (
                    <>
                        <Tooltip title={t('strCancel')}>
                            <IconButton color="primary" onClick={handleCloseCollapse}  ><CloseTwoToneIcon /></IconButton>
                        </Tooltip>
                        {[enmActionType.Add, enmActionType.Edit].includes(actionType) && (
                            <Tooltip title={t('strSave')}>
                                <IconButton color="primary" onClick={onSubmit}  ><SaveTwoToneIcon /></IconButton>
                            </Tooltip>
                        )}
                    </>
                )}
            </GridToolbarContainer>
            <Collapse in={actionType !== -1} timeout="auto">
                <Grid container spacing={2} sx={{ p: 2 }}>
                    {renderForm()}
                </Grid>
            </Collapse>

            <Dialog
                open={deleteConfOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('strDeleteItem')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('strDeleteConfMessage')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm}>{t('strYes')}</Button>
                    <Button variant="outlined" onClick={() => { setDeleteConfOpen(false) }} autoFocus>
                        {t('strNo')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Toolbar