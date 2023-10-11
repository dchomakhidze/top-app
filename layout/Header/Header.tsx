import { HeaderProps } from './Header.props';
import styles from './Header.module.css'
import cn from 'classnames';
import LogoMobile from '../logo.svg'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Header = ({className, ...props }: HeaderProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const router = useRouter();
    
    useEffect(() => {
        setIsOpened(false)
    }, [router])

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: 0,
            x: '100%',
        }
    }
    
    return (
        <header className={cn(styles.header)} {...props} >
            <LogoMobile />
            <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
            <motion.div
                className={styles.mobileMenu}
                variants={variants}
                initial={'closed'}
                animate={isOpened ? 'opened' : 'closed'}
            >
                <Sidebar />
                <ButtonIcon className={styles.mobileMenuClose} appearance='white' icon='close' onClick={() => setIsOpened(false)} />
            </motion.div>
        </header>
    )
};

// useEffect(() => {setIsOpened(false)}, [router])- как только меняется роутер = ставим меню в закрытое