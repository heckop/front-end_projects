import React, { useContext,useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout,setIsCheckout]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1});
  };
  const checkouthandle=()=>{
    setIsCheckout(true);
  }
  const formSubmitHandler=async (userData)=>{
    setIsSubmitting(true);
    await fetch('https://react-projects-abc88-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderedItems:cartCtx.items
      })
    });
    
    setIsSubmitting(false);
    setDidSubmit(true);
    console.log('submitted');
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderbuttons=<div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onHide}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={checkouthandle}>Order</button>}
</div>
const modalActions=<React.Fragment>{cartItems}
<div className={classes.total}>
  <span>Total Amount</span>
  <span>{totalAmount}</span>
</div>
{isCheckout && <Checkout onConfirm={formSubmitHandler } onCancel={props.onHide}/>}
{!isCheckout && orderbuttons}
</React.Fragment>
const didSubmitModalContent=(<React.Fragment>
  <p>Successfully sent the order!</p>
  <div className={classes.actions}>
    <button className={classes.button} onClick={props.onHide}>
      Close
    </button>
  </div>
</React.Fragment>);
  return (
    <Modal onHide={props.onHide}>
      {!isSubmitting && !didSubmit && modalActions}
      {isSubmitting && <p>Sending order data...</p>}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;