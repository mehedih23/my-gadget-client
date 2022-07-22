import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2'
import auth from '../firebase.init';

const Product = ({ product }) => {
    const { _id, category, name, price, details } = product;
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    // loadings //
    if (loading) {
        return <div className='h-screen flex justify-center items-center'>
            <ClipLoader loading={loading} size={150} />
        </div>
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success',
                    fetch(`http://localhost:1111/product/${_id}`, {
                        method: 'DELETE',
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.acknowledged) {
                                navigate('/');
                                toast.success('Product Removed Successfully', { id: 'removed successfull' });
                            }
                        })

                )
            }
        })

    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{name}</h2>
                    <span>Category: {category}</span>
                    <h3>Price: ${price}</h3>
                    <p>{details}</p>
                    {
                        user && <div class="card-actions justify-between">
                            <Link to={`/products/${_id}`}><button class="btn btn-primary btn-sm">Update</button></Link>
                            <button onClick={handleDelete} class="btn btn-error btn-sm">Delete</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Product