import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { CartDropDownContainer, CartItems, EmptyMessage  } from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map(cartItem => 
                        <CartItem key={cartItem.id} cartItem={cartItem} />))
                        : (
                            <EmptyMessage>Your cart is empty</EmptyMessage>
                        )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    )
}

export default CartDropdown;