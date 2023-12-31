import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css'
import cn from 'classnames';
import { Rating } from '../Rating/Rating';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/Textarea';
import { Button } from '../Buttons/Button';
import CloseIcon from './close.svg'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';


export const ReviewForm = ({ productId, isopened, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setIsError] = useState<string>()

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setIsError('Что-то пошло не так')
            }
        }
        catch (e: any) {
            setIsError(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Заполните имя'
                        }
                    })}
                    placeholder='Имя'
                    error={errors.name}
                    tabIndex={isopened ? 0 : -1}
                />
                <Input
                    {...register('title', {
                        required: {
                            value: true,
                            message: 'Заполните заголовок'
                        }
                    })}
                    placeholder='Заголовок отзыва'
                    error={errors.title}
                    tabIndex={isopened ? 0 : -1}
                />
                {/* <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <Input
                            className={styles.input}
                            {...field}
                            placeholder="Имя"
                        />
                    )}
                /> */}
                {/* <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <Input
                            className={styles.input}
                            {...field}
                            placeholder="Заголовок отзыва"
                        />
                    )}
                /> */}
                <div className={styles.ratingForm}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={
                            {required: {
                                value: true,
                                message: 'Укажите рейтинг'
                            }}}
                        render={({ field }) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                                error={errors.rating}
                            />
                        )}
                    />

                </div>
                {/* <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <TextArea
                            className={styles.description}
                            {...field}
                            placeholder="Текст отзыва"
                        />
                    )}
                /> */}
                <TextArea
                    {...register('description', {
                        required: {
                            value: true,
                            message: 'Заполните отзыв'
                        }
                    })}
                    className={styles.description}
                    placeholder='Текст отзыва'
                    error={errors.description}
                    tabIndex={isopened ? 0 : -1}
                />
                <div className={styles.submit}>
                    <Button appearance='primary' tabIndex={isopened ? 0 : -1}>Отправить</Button>
                    <span className={styles.text}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>

            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>
                    Ваш отзыв отправлен
                </div>
                <div>
                    Спасибо, Ваш отзыв будет опубликован после проверки
                </div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Что то пошло не так, попробуйте обновить страницу
                <CloseIcon className={styles.close} onClick={() => setIsError(undefined)}/>
            </div>}
        </form>
    )
}
