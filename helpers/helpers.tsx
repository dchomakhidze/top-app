import CoursesIcon from './icons/courses.svg'
import ServicesIcon from './icons/services.svg'
import GoodsIcon from './icons/goods.svg'
import BooksIcon from './icons/books.svg'
import { TopLevelCategory } from '../interfaces/toppage.inerface'
import { FirstLevelMenuItem } from '../interfaces/menu.interface'

 export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Servises },
    { route: 'goods', name: 'Продукты', icon: <GoodsIcon />, id: TopLevelCategory.Products },
    { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books }
]

export const priceUa = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₴');

export const decOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}