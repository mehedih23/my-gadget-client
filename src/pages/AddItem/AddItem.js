import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    // from form-hook //
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();

    // from form-hook function //
    const onSubmit = data => {
        const category = data.category;
        const name = data.name;
        const price = data.price;
        const details = data.details;
        const product = { category, name, price, details };
        fetch(`https://evening-beyond-97971.herokuapp.com/additem`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Product added successfully', { id: 'Product successfull' });
                    navigate('/');
                }
            })
    }
    return (
        <div className='max-w-3xl mx-auto text-center my-6'>
            <h2 className='text-center text-3xl my-6 text-accent'>Add Product</h2>\
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label w-full max-w-xs mx-auto">
                    <span className="label-text">Category</span>
                </label>
                <select class="select select-primary w-full max-w-xs mx-auto"
                    {...register("category", { required: true })}
                >
                    <option disabled selected>Pick your favorite one</option>
                    <option value='Phone'>Phone</option>
                    <option value='Tablet'>Tablet</option>
                    <option value='Laptop'>Laptop</option>
                </select>
                <label className="label w-full max-w-xs mx-auto">
                    <span className="label-text">Product Name</span>
                </label>
                <input
                    type="text"
                    {...register("name", { required: true })}
                    className="input input-bordered w-full input-primary max-w-xs" />
                <label className="label w-full max-w-xs mx-auto">
                    {errors.name?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors?.name?.message}</span>}
                </label>
                <label className="label w-full max-w-xs mx-auto">
                    <span className="label-text">Price</span>
                </label>
                <input
                    type="number"
                    {...register("price", { required: true })}
                    className="input input-bordered w-full input-primary max-w-xs" />
                <label className="label w-full max-w-xs mx-auto">
                    {errors.price?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors?.price?.message}</span>}
                </label>
                <label className="label w-full max-w-xs mx-auto">
                    <span className="label-text">Details</span>
                </label>
                <textarea
                    {...register("details", { required: true })}
                    className="textarea w-full input-primary max-w-xs" placeholder="Add product Details">
                </textarea>
                <label className="label w-full max-w-xs mx-auto">
                    {errors.details?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors?.details?.message}</span>}
                </label>

                <input type="submit" value="Update" className='btn btn-accent w-full max-w-xs mt-3' />
            </form>
        </div>
    )
}

export default AddItem