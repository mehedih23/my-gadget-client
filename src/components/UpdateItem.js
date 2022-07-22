import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState({})
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:1111/getitem/${id}`)
            .then(response => response.json())
            .then(data => setItem(data))
    }, [id, setItem])

    // from form-hook //
    const { register, formState: { errors }, handleSubmit } = useForm();

    // from form-hook function //
    const onSubmit = data => {
        const name = data.name;
        const price = data.price;
        const details = data.details;
        const product = { name, price, details };
        fetch(`http://localhost:1111/updateDetails/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    navigate('/products');
                    toast.success('Updated Successfully', { id: 'update successfull' })
                }
            })
    }

    return (
        <div className='max-w-3xl mx-auto text-center my-6'>
            <h1 className='text-center text-3xl text-accent my-6'>Update Info</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label w-full max-w-xs mx-auto">
                    <span className="label-text">Product Name</span>
                </label>
                <input
                    type="text"
                    {...register("name", { required: true })}
                    defaultValue={item?.name}
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
                    defaultValue={item?.price}
                    className="input input-bordered w-full input-primary max-w-xs" />
                <label className="label w-full max-w-xs mx-auto">
                    {errors.price?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors?.price?.message}</span>}
                </label>
                <label className="label w-full max-w-xs mx-auto">
                    <span className="label-text">Details</span>
                </label>
                <textarea
                    {...register("details", { required: true })}
                    defaultValue={item?.details}
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

export default UpdateItem