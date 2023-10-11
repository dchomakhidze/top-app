import { FooterProps } from './Footer.props';
import styles from './Footer.module.css'
import cn from 'classnames';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div>
                OwlTop © 2022 - {format(new Date(), 'yyyy')} Все права защищены
            </div>
            <a href='#' target='_blank'>Пользовтельское соглашение</a>
            <a href='#' target='_blank'>Политика конфиденциальности</a>
        </footer>
    )
};