import React from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import laptop from '../assets/ninja-laptop.png';
import auth from '../firebase.init';

const ForgotPass = () => {

    // from form-hook //
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    // loadings //
    if (sending) {
        return <div className='h-screen flex justify-center items-center'>
            <ClipLoader loading={sending} size={150} />
        </div>
    }

    // errors //
    let signInError;
    if (error) {
        signInError = <span className='text-sm text-red-600'>{error?.message}</span>
    }

    const onSubmit = async data => {
        const email = data.email;
        await sendPasswordResetEmail(email);
        toast.success('Check Your Email.')
    }

    return (
        <div>
            <h3 className='text-center my-6 text-3xl text-accent-focus'>Recover Your Password</h3>
            <div className='flex flex-col md:flex-row md:justify-evenly md:items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto md:mx-0">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Provide a valid email address'
                            }
                        })}
                        placeholder="Type here"
                        className="input input-bordered  w-72 md:w-80 lg:w-96" />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-sm text-red-600">{errors.email.message}</span>}
                        {signInError}
                    </label>
                    <input type="submit" value="Recover Password" className='btn btn-active w-72 md:w-80 lg:w-96 mt-3' />
                </form>
                <img src={laptop} alt="ninja with laptop" />
            </div>
        </div>
    )
}

export default ForgotPass