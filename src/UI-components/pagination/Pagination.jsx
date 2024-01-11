import React from 'react';
import s from './Pagination.module.scss';
import { Stack } from '@mui/material';

const Pagination = (props) => {
    debugger
    return (
        <>
            <div className={s.pagination}> 
                <Stack>
                    <Pagination
                        onChange={(event, value) => props.onChange(value)}
                        page={props.page}
                        count={props.count}
                        shape="rounded"
                        variant="outlined"
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            </div>
        </>
    );
}

export default Pagination;
