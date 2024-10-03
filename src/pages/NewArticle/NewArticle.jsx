// import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { shemaNewArticle } from '../../components/Form/formSchema';
import { useAddNewArticleMutation } from '../../servises/articlesApi';
import './NewArticle.css';

export default function NewArticle() {
    const navigate = useNavigate();
    const [addNewArticle] = useAddNewArticleMutation();
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(shemaNewArticle),
        defaultValues: {
            tags: [{ number: '' }],
        },
    });

    const onSubmit = async (data) => {
        // const res = data.tags.slice(0, -1).map((item) => item.number);
        // console.log(res, data.tags.slice(0, -1));
        const response = {
            article: {
                title: data.title,
                description: data.shortDescription,
                body: data.text,
                tagList: data.tags.slice(0, -1).map((item) => item.number),
            },
        };

        await addNewArticle(response)
            .unwrap()
            .then((payload) => {
                console.log('это payload - ', payload);
                reset();
                navigate('/');
            })
            .catch((err) => {
                console.log('это err - ', err);
            });
        // console.log(response);
    };

    const { fields, append, remove } = useFieldArray({
        name: 'tags',
        control,
    });
    return (
        <section className="new-article">
            <span className="new-article__title">Create new article</span>
            <form className="new-article__form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title" className="new-article__label">
                    Title
                    <input
                        {...register('title')}
                        type="text"
                        id="title"
                        className={`${'new-article__input'} ${errors?.title ? 'new-article__input_error' : 'new-article__input_margin'}`}
                        placeholder="Title"
                    />
                    <div>{errors?.title && <p className="errors__text">{errors?.title?.message || 'Error'}</p>}</div>
                </label>
                <label htmlFor="description" className="new-article__label">
                    Short description
                    <input
                        {...register('shortDescription')}
                        type="text"
                        id="description"
                        className={`${'new-article__input'} ${errors?.shortDescription ? 'new-article__input_error' : 'new-article__input_margin'}`}
                        placeholder="Title"
                    />
                    <div>
                        {errors?.shortDescription && (
                            <p className="errors__text">{errors?.shortDescription?.message || 'Error'}</p>
                        )}
                    </div>
                </label>
                <label htmlFor="textarea" className="new-article__label-title">
                    Text
                    <textarea
                        {...register('text')}
                        id="textarea"
                        className={`${'new-article__textarea'} ${errors?.text ? 'new-article__textarea_error' : 'new-article__textarea_margin'}`}
                        placeholder="Text"
                    />
                    <div>{errors?.text && <p className="errors__text">{errors?.text?.message || 'Error'}</p>}</div>
                </label>
                <div className="tags">
                    <div className="tags__box">
                        <label htmlFor={`tags.${[0]}.number`} className="tags__label">
                            Tags
                            {fields.map((field, index) => {
                                return (
                                    <div className="tags__item" key={field.id}>
                                        <input
                                            type="text"
                                            id={`tags.${index}.number`}
                                            {...register(`tags.${index}.number`)}
                                            className="tags__input"
                                        />
                                        <button
                                            type="button"
                                            className="tags__btn-del"
                                            onClick={() => {
                                                if (field.id === fields.slice(-1)[0].id) return;
                                                remove(index);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                );
                            })}
                        </label>
                    </div>
                    <div className="tags__btn-box">
                        <button type="button" onClick={() => append()} className="tags__btn-add">
                            Add tag
                        </button>
                    </div>
                </div>
                <button type="submit" className="new-article__submit">
                    Send
                </button>
            </form>
        </section>
    );
}
