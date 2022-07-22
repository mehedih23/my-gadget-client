import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import auth from '../../firebase.init';

const Profile = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://evening-beyond-97971.herokuapp.com/user?email=${user?.email}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data)
            })
    }, [setUsers, user?.email])

    // loadings //
    if (loading) {
        return <div className='h-screen flex justify-center items-center'>
            <ClipLoader loading={loading} size={150} />
        </div>
    }

    // errors //
    let Error;
    if (error) {
        Error = <span className='text-sm text-red-600'>{error}</span>
    }



    // from form-hook function //
    const onSubmit = data => {
        const userName = data.name;
        const phone = data.phone;
        const city = data.city;
        const streetAddress = data.sa;
        const postOffice = data.po;
        const postCode = data.pc;
        const education = data.education;
        const linkedInLink = data.linkedin;
        const myDetails = {
            userName,
            phone,
            city,
            streetAddress,
            postOffice,
            postCode,
            education,
            linkedInLink
        }
        fetch(`https://evening-beyond-97971.herokuapp.com/userDetails/${users?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myDetails)
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    navigate('/');
                    toast.success('Updated Successfully', { id: 'update successfull' })
                }
            })
    }

    return (
        <div>
            <h1 className='text-4xl font-bold my-4 text-center text-accent'>Update Your Profile</h1>
            <div className='text-center'>
                <form className='p-1 md:p-2 lg:p-4' onSubmit={handleSubmit(onSubmit)}>
                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        defaultValue={users?.userName}
                        readOnly
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto"></label>
                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        defaultValue={users?.email}
                        readOnly
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto"></label>
                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">Phone</span>
                    </label>
                    <input
                        type="number"
                        {...register("phone", {
                            required: {
                                value: true,
                                message: 'Phone number is required'
                            },
                            minLength: {
                                value: 10,
                                message: 'Phone number Must be 10 Digit'
                            }
                            ,
                            maxLength: {
                                value: 11,
                                message: 'Phone number can not be longer from 11 Digit'
                            }
                        })}
                        placeholder="Type here"
                        defaultValue={users?.phone || null}
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto">
                        {errors.phone?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.phone.message}</span>}
                        {errors.phone?.type === 'minLength' && <span className="label-text-alt text-sm text-red-600">{errors.phone.message}</span>}
                        {errors.phone?.type === 'maxLength' && <span className="label-text-alt text-sm text-red-600">{errors.phone.message}</span>}
                    </label>

                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">City</span>
                    </label>
                    <input
                        type="text"
                        {...register("city", {
                            required: {
                                value: true,
                                message: 'City is required'
                            }
                        })}
                        placeholder="Type here"
                        defaultValue={users?.city || null}
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto">
                        {errors.city?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.city.message}</span>}
                    </label>

                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">Post Office</span>
                    </label>
                    <input
                        type="text"
                        {...register("po", {
                            required: {
                                value: true,
                                message: 'Post Office is required'
                            }
                        })}
                        placeholder="Type here"
                        defaultValue={users?.postOffice || null}
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto">
                        {errors.po?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.po.message}</span>}
                    </label>

                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">Post Code</span>
                    </label>
                    <input
                        type="number"
                        {...register("pc", {
                            required: {
                                value: true,
                                message: 'Post Code is required'
                            },
                            minLength: {
                                value: 4,
                                message: 'Must Be 4 digit post code'
                            },
                            maxLength: {
                                value: 4,
                                message: 'Must Be 4 digit post code'
                            }
                        })}
                        placeholder="Type here"
                        defaultValue={users?.postCode || null}
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto">
                        {errors.pc?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.pc.message}</span>}
                        {errors.pc?.type === 'minLength' && <span className="label-text-alt text-sm text-red-600">{errors.pc.message}</span>}
                        {errors.pc?.type === 'maxLength' && <span className="label-text-alt text-sm text-red-600">{errors.pc.message}</span>}
                    </label>

                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">Street Address</span>
                    </label>
                    <input
                        type="text"
                        {...register("sa", {
                            required: {
                                value: true,
                                message: 'Street Address is required'
                            }
                        })}
                        placeholder="Type here"
                        defaultValue={users?.streetAddress || null}
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto">
                        {errors.sa?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.sa.message}</span>}
                    </label>

                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">Education</span>
                    </label>
                    <input
                        type="text"
                        {...register("education", {
                            required: {
                                value: true,
                                message: 'Education is required'
                            }
                        })}
                        placeholder="Type here"
                        defaultValue={users?.education || null}
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto">
                        {errors.education?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.education.message}</span>}
                    </label>

                    <label className="label w-full max-w-xs mx-auto">
                        <span className="label-text">LinkedIn</span>
                    </label>
                    <input
                        type="text"
                        {...register("linkedin", {
                            required: {
                                value: true,
                                message: 'LinkedIn Link is required'
                            }
                        })}
                        placeholder="Type here"
                        defaultValue={users?.linkedInLink || null}
                        className="input input-bordered w-full input-primary max-w-xs" />
                    <label className="label w-full max-w-xs mx-auto">
                        {errors.linkedin?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.linkedin.message}</span>}
                    </label>

                    {Error}
                    <input type="submit" value="Update" className='btn btn-accent w-full max-w-xs mt-3' />
                </form>
            </div>
        </div>
    )
}

export default Profile