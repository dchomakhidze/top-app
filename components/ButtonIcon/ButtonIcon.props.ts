/* так с помощью дженериков описываются пропсы мы наследуем функционал кнопок, от детальных пропсовю Все что есть у обычных  button теперь есть у  Button*/
/* ButtonHTMLAttributes - специфичные атрибуты именно для кнопки, они экстендят HTMLATTRIBUTE */
/*HTMLButtonElement - при клке мы попадаем в глобал - все интерфейсты там пустные, чтобы получить правильные дефинишин мы должны использовать lib dom - для получения правильных свойств html-элементов */

import close from './close.svg'
import menu from './menu.svg'
import up from './up.svg'

export const icons = {
    up,
    close,
    menu
};

export type IconName = keyof typeof icons;

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: IconName;
    appearance: 'primary' | 'white';
}