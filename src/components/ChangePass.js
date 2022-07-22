import React from 'react'
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import auth from '../firebase.init';

const ChangePass = () => {

    // from form-hook //
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    const navigate = useNavigate();


    // loadings //
    if (updating) {
        return <div className='h-screen flex justify-center items-center'>
            <ClipLoader loading={updating} size={150} />
        </div>
    }

    // errors //
    let passError;
    if (error) {
        passError = <span className='text-sm text-red-600'>{error?.message}</span>
    }


    const onSubmit = async data => {
        const password = data.password;
        const newPassword = data.newPassword;
        const confirmPassword = data.confirmPassword;
        if (newPassword !== confirmPassword) {
            toast.error('Password do not match');
            reset();
        } else if (password === newPassword) {
            toast.error('You can not use old password', { id: 'old password' });
            reset();
        } else {
            await updatePassword(newPassword);
            toast.success('Password change successfully.', { id: 'change successfully' });
            navigate('/');
        }
    }
    return (
        <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-center text-accent text-3xl my-6'>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full mx-auto'>
                <label className="label w-72 md:w-80 lg:w-96 mx-auto">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: 'Password is required'
                        },
                        pattern: {
                            value: /^(?=.*[\W])[\w\W]{6,20}$/,
                            message: 'One special character required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Must be 6 characters longer'
                        }
                        ,
                        maxLength: {
                            value: 20,
                            message: 'Must be 20 characters smaller'
                        }
                    })}
                    placeholder="Type here"
                    className="input input-bordered w-72 md:w-80 lg:w-96" />
                <label className="label">
                    {errors.password?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                    {errors.password?.type === 'pattern' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                    {errors.password?.type === 'maxLength' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                </label>
                <label className="label w-72 md:w-80 lg:w-96 mx-auto">
                    <span className="label-text">New Password</span>
                </label>
                <input
                    type="password"
                    {...register("newPassword", {
                        required: {
                            value: true,
                            message: 'Password is required'
                        },
                        pattern: {
                            value: /^(?=.*[\W])[\w\W]{6,20}$/,
                            message: 'One special character required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Must be 6 characters longer'
                        }
                        ,
                        maxLength: {
                            value: 20,
                            message: 'Must be 20 characters smaller'
                        }
                    })}
                    placeholder="Type here"
                    className="input input-bordered  w-72 md:w-80 lg:w-96" />
                <label className="label w-72 md:w-80 lg:w-96 mx-auto">
                    {errors.newPassword?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.newPassword.message}</span>}
                    {errors.newPassword?.type === 'pattern' && <span className="label-text-alt text-sm text-red-600">{errors.newPassword.message}</span>}
                    {errors.newPassword?.type === 'minLength' && <span className="label-text-alt text-sm text-red-600">{errors.newPassword.message}</span>}
                    {errors.newPassword?.type === 'maxLength' && <span className="label-text-alt text-sm text-red-600">{errors.newPassword.message}</span>}
                </label>
                <label className="label w-72 md:w-80 lg:w-96 mx-auto">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: 'Password is required'
                        },
                        pattern: {
                            value: /^(?=.*[\W])[\w\W]{6,20}$/,
                            message: 'One special character required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Must be 6 characters longer'
                        }
                        ,
                        maxLength: {
                            value: 20,
                            message: 'Must be 20 characters smaller'
                        }
                    })}
                    placeholder="Type here"
                    className="input input-bordered  w-72 md:w-80 lg:w-96" />
                <label className="label w-72 md:w-80 lg:w-96 mx-auto">
                    {errors.confirmPassword?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.confirmPassword.message}</span>}
                    {errors.confirmPassword?.type === 'pattern' && <span className="label-text-alt text-sm text-red-600">{errors.confirmPassword.message}</span>}
                    {errors.confirmPassword?.type === 'minLength' && <span className="label-text-alt text-sm text-red-600">{errors.confirmPassword.message}</span>}
                    {errors.confirmPassword?.type === 'maxLength' && <span className="label-text-alt text-sm text-red-600">{errors.confirmPassword.message}</span>}
                </label>
                <input type="submit" value="Change Password" className='btn btn-active  w-72 md:w-80 lg:w-96 mt-3' />
                <label className="label">
                    <span className="label-text-alt text-sm text-red-600">{passError}</span>
                </label>
            </form>
        </div>
    )
}

export default ChangePass