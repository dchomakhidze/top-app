import { ProductModel } from '../../interfaces/product.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/toppage.inerface';


export interface TopPageComponentProps {
    firstCategory: TopLevelCategory;
    page: TopPageModel,
    products: ProductModel[]
}