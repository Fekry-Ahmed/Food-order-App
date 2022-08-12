import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CardItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

function Cart(props) {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = function (id) {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = function (item) {
        cartCtx.addItem(item);
    };

    const cardItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CardItem
                    name={item.name}
                    key={item.id}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                ></CardItem>
            ))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cardItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes["cutton--alt"]}
                    onClick={props.onClose}
                >
                    Close
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;
