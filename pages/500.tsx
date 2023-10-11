
import React from 'react';
import { Htag } from '../components/Htag/Htag';
import { withLayout } from '../layout/Layout'


function Error500 (): JSX.Element {
    return (
        <>
            <Htag tag="h1">Ошибка 404</Htag>
        </>
    )
};

export default withLayout(Error500)