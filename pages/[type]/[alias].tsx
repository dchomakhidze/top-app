// квадратные скобки означают получение динамического роута

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/toppage.inerface';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';
import Head from 'next/head'


function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
    return (
        <>
            {page && products && <><Head>
                <title>{page.metaTitle}</title>
                <meta name='description' content={page.metaDescription}></meta>
                <meta property='og:title' content={page.metaTitle}></meta>
                <meta property='og:description' content={page.metaDescription}></meta>
                <meta property='og:type' content='article'></meta>
            </Head>
                <TopPageComponent firstCategory={firstCategory} page={page} products={products} /></>}
        </>
    )
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = []
    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
    }

    return {
        paths, // мы получили меню и разложили его в плоский массив урлов (иначе бы у нас получился массив массивов) из этого мы забрали только alias прибавили к нему courses и получили список урлов по которым ему нужно будет пройись
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
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

    try {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: firstCategoryItem.id
        }); // после того как мы получили меню, мы можем получить страницу
        if (menu.length === 0) {
            return {
                notFound: true
            };
        }
        const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);
        const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
            category: page.category,
            limit: 10
        });
        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            },
        };
    } catch (e) {
        return {
            notFound: true
        };
    }


};

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel,
    products: ProductModel[]
}