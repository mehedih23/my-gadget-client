import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import google from '../assets/google.png'



const Signup = () => {
    // from form-hook //
    const { register, formState: { errors }, handleSubmit } = useForm();
    // firebase login services //
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        errorCreate,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, errorUpdate] = useUpdateProfile(auth);
    const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);

    let navigate = useNavigate();

    if (user || userGoogle) {
        navigate("/");
    }

    // loadings //
    if (loading || updating || loadingGoogle) {
        return <div className='h-screen flex justify-center items-center'>
            <ClipLoader loading={loading || updating || loadingGoogle} size={150} />
        </div>
    }

    // errors //
    let signInError;
    if (errorCreate || errorUpdate || errorGoogle) {
        signInError = <span className='text-sm text-red-600'>{errorCreate?.message || errorUpdate?.message || errorGoogle?.message}</span>
    }


    const onSubmit = async data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const myUser = { userName: name, email };
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });
        toast.success('Please Verify your email.', { id: 'verify-email' });

        fetch(`http://localhost:1111/registeruser`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myUser)
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Account Create Successfully', { id: 'account successfull' })
                }
            })

    };
    return (
        <div>
            <h1 className='text-3xl text-center underline text-accent'>Sign Up</h1>
            <div className='w-full my-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input
                        type="text"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is required'
                            }
                        })}
                        placeholder="Type here"
                        className="input input-bordered w-72 md:w-80 lg:w-96" />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors?.name?.message}</span>}
                    </label>
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
                    </label>
                    <label className="label">
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
                        className="input input-bordered  w-72 md:w-80 lg:w-96" />
                    <label className="label">
                        {errors.password?.type === 'required' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                        {errors.password?.type === 'pattern' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                        {errors.password?.type === 'minLength' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                        {errors.password?.type === 'maxLength' && <span className="label-text-alt text-sm text-red-600">{errors.password.message}</span>}
                    </label>
                    <input type="submit" value="Register" className='btn btn-active  w-72 md:w-80 lg:w-96 mt-3' />
                </form>
                {signInError}
            </div>

            <p className='my-4'>Already Have an Account? <Link to='/security' className='text-primary font-bold'>Login</Link></p>
            <div className="divider mb-4">OR</div>

            <button
                onClick={() => signInWithGoogle()}
                className='btn btn-outline btn-accent w-72 md:w-80 lg:w-96 shadow-lg shadow-secondary'
            >
                <img src={google} alt="google" className='w-6 h-6' />
            </button>
        </div>
    )
}

export default Signup