import classNames from 'classnames';
import { Advantages, HhData, Htag, Paragraph, Product, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css'
import { TopLevelCategory } from '../../interfaces/toppage.inerface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReduser } from './sort.reduser'
import { useScrollY } from '../../hooks/useScrollY';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReduser, { products, sort: SortEnum.Rating })

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort })
    }

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products })
    }, [products])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products && <Tag color='grey' size='m' >{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => <Product layout key={p._id} product={p}/>)}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag='h2'>Преимущества</Htag>
                <Advantages advantages={page.advantages} />
            </>
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }}></div>}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map(t => <Tag key={t} size='s' color="primary">{t}</Tag>)}
        </div>
    )
};