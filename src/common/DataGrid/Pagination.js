/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import { GridPagination, useGridApiContext, useGridSelector, gridPageCountSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';

const Pagination = (props) => {
    return <GridPagination ActionsComponent={PaginationActionsComponent} {...props} />;
}

const PaginationActionsComponent = ({ page, onPageChange, className }) => {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            color="secondary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event, newPage - 1);
            }}
        />
    );
}

export default Pagination