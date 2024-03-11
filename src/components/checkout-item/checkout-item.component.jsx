import {CheckoutItemContainer, ImageContainer, RemoveButton } from './checkout-item.styles';

import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <span className='arrow' onClick={removeItemHandler}>&#10094;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={addItemHandler}>&#10095;</span>
            </div>
            <span className='price'>{price}</span>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;