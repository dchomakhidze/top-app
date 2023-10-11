import { useEffect, useState } from 'react'

export const useScrollY = (): number => {

    const isBrowser = typeof window !== undefined;

    const [scrollY, setScrollY] = useState<number>(0)

    const handleScroll = () => {
        const currentScrollY = isBrowser ? window.scrollY : 0;
        setScrollY(currentScrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return scrollY
}

// мы подписались на скрол и отписались при анмаунте (return в useEffect), 
//далее в случае емсли произошло событие - мы получаем текущее положение Y, устанавливаем его в стейт и наш хук его возвращает
// мы это создали что бы могли подписаться на событие offset

//useScrollY - где мы находимся