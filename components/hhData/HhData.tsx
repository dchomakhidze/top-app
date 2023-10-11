import { HhDataProps } from './HhData.props';
import styles from './HhData.module.css'
import cn from 'classnames';
import { Card } from '../Card/Card';
import Star from './star.svg'
import { priceUa } from '../../helpers/helpers';

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.count} >
                <div className={styles.title}>Всего вакансий </div>
                <div className={styles.statCount}>{count}</div>
            </Card>
            <Card className={styles.salary} >
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles.salaryValue}>{priceUa(juniorSalary)}</div>
                    <div className={styles.star}>
                        <Star className={styles.filled} />
                        <Star />
                        <Star />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles.salaryValue}>{priceUa(middleSalary)}</div>
                    <div className={styles.star}>
                        <Star className={styles.filled} />
                        <Star className={styles.filled} />
                        <Star />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Продвинутый</div>
                    <div className={styles.salaryValue}>{priceUa(seniorSalary)}</div>
                    <div className={styles.star}>
                        <Star className={styles.filled} />
                        <Star className={styles.filled} />
                        <Star className={styles.filled} />
                    </div>
                </div>
            </Card>
        </div>
    )
};