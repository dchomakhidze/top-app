/* так с помощью дженериков описываются пропсы мы наследуем функционал кнопок, от детальных пропсовю Все что есть у обычных  button теперь есть у  Button*/
/* ButtonHTMLAttributes - специфичные атрибуты именно для кнопки, они экстендят HTMLATTRIBUTE */
/*HTMLButtonElement - при клке мы попадаем в глобал - все интерфейсты там пустные, чтобы получить правильные дефинишин мы должны использовать lib dom - для получения правильных свойств html-элементов */

//Omit позволяет из тайпскрипта удалить свойства для типизации

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends 
Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'>
{
    children: ReactNode;
    appearance: 'primary' | 'ghost';
    arrow?: 'right' | 'down' | 'none';
}