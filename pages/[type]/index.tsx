import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import axios from 'axios';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'node:querystring';
import { API } from '../../helpers/api';

function Type({ firstCategory }: TypeProps): JSX.Element {

    return (
        <>
            Type: {firstCategory}
        </>
    )
};

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(m => '/' + m.route), // мы получили меню и разложили его в плоский массив урлов (иначе бы у нас получился массив массивов) из этого мы забрали только alias прибавили к нему courses и получили список урлов по которым ему нужно будет пройись
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    };

    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
    if (!firstCategoryItem) {
        return {
            notFound: true
        };
    };

    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: firstCategoryItem.id
    });
    return {
        props: {
            menu,
            firstCategory: firstCategoryItem.id
        },
    };
};

interface TypeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}