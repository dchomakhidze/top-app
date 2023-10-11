import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { Button, Htag, Input, Paragraph, Rating, Tag, TextArea } from '../components';
import { Layout, withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Page({ menu }: HomeProps): JSX.Element {

    const [counter, setCounter] = useState<number>(0);

    const [rating, setRating] = useState<number>(4)

    useEffect(() => {
        console.log('Counter' + counter)
    });

    return (
        <>
            <Htag tag="h1">{counter}</Htag>
            <Button appearance='primary' arrow='down' onClick={() => setCounter(x => x + 1)}>Кнопка</Button>
            <Button appearance='ghost'>Кнопка</Button>
            <Button appearance='ghost' arrow='down'>Кнопка</Button>
            <Paragraph size='s'>Some text</Paragraph>
            <Paragraph size='m'>Some text</Paragraph>
            <Paragraph size='l'>Some text</Paragraph>
            <Tag size='s' color='green'>10</Tag>
            <Tag size='m' color='primary'>oooooo</Tag>
            <Rating rating={rating} isEditable setRating={setRating}/>
            <Input placeholder='nnn'/>
            <TextArea placeholder='nnn'/>
        </>
    )
};

export default withLayout(Page);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}