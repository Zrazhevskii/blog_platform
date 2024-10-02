// import { useState } from 'react';
import './NewArticle.css';
import { useFieldArray, useForm } from 'react-hook-form';

export default function NewArticle() {
    // const [tags, setTags] = useState([]);
    const { register, control, handleSubmit, formState } = useForm({
        defaultValues: {
            title: '',
            shotDiscribe: '',
            text: '',
            tags: [{ number: '' }],
        },
    });
    // const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        name: 'tags',
        control,
    });
    return (
        <section className="new-article">
            <span className="new-article__title">Create new article</span>
            <form className="new-article__form">
                <label htmlFor="title" className="new-article__label">
                    Title
                    <input
                        type="text"
                        id="title"
                        className="new-article__input new-article__input_style"
                        placeholder="Title"
                    />
                </label>
                <label htmlFor="description" className="new-article__label">
                    Shot description
                    <input
                        type="text"
                        id="description"
                        className="new-article__input new-article__input_style"
                        placeholder="Title"
                    />
                </label>
                <label htmlFor="textarea" className="new-article__label-title">
                    Text
                    <textarea
                        id="textarea"
                        className="new-article__textarea new-article__textarea_style"
                        placeholder="Text"
                    />
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
                                                if (index === 0) return;
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
                        <button type="button" onClick={() => append({ number: '' })} className="tags__btn-add">
                            Add tag
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
