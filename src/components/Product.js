import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { _id, category, name, price, details } = product;
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{name}</h2>
                    <span>Category: {category}</span>
                    <h3>Price: ${price}</h3>
                    <p>{details}</p>
                    <div class="card-actions justify-between">
                        <Link to={`/products/${_id}`}><button class="btn btn-primary btn-sm">Update</button></Link>
                        <button class="btn btn-error btn-sm">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product