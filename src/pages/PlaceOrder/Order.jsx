import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import { StoreContext } from '../../context/StoreContext'
import Razorpay from 'razorpay';
import axios from 'axios';

const Order = () => {
    const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
    const [data,setData]=useState({
      firstname:"",
      lastname:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
    });
    
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }
    
    const placeAddress=async(event)=>{
    event.preventDefault();
    const orderItem=[];
    food_list.map((item)=>{
      if(cartItems[item.id]>0){
        let iteminfo=item;
        iteminfo["quantity"]=cartItems[item_id];
        orderItem.push(iteminfo);
      }
    })
    let ord={
      address:data,
      items:orderItem,
      amount:getTotalCartAmount()+40
    }
    const response=await axios.post(url+"/api/addreess/address-user",ord );
      
    }
    // useEffect(()=>{console.log(data)},[data]);
    
    const loadRazorpay = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    
    const handlePayment = async (event) => {
      event.preventDefault();
      const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
  
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }
  
      const result = await axios.post('https://food-backend-s5to.onrender.com/api/order/place', {
        amount: getTotalCartAmount()+40,
      });
  
      if (!result) {
        alert('Server error. Are you online?');
        return;
      }
  
      const { amount, id: order_id, currency } = result.data;
  
      const options = {
        key: 'rzp_test_cljMP0gGJUkwTV',
        amount: amount.toString(),
        currency: currency,
        name: 'Tomato',
        description: 'Test Transaction',
        image: 'https://your-logo-url.com',
        order_id: order_id,
        handler: async (response) => {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
  
           await axios.post('https://food-backend-s5to.onrender.com/api/order/payment-verification', data);
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '7708334415',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#61dafb',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
  
    
  return (
    <form onSubmit={placeAddress} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" name='firstname' onChange={onChangeHandler} value={data.firstname} placeholder='first name'/>
                    <input type="text" name='lastname' onChange={onChangeHandler} value={data.lastname} placeholder='last name'/>
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='email address'/>
                <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street'/>
                <div className="multi-fields">
                    <input name='city' onChange={onChangeHandler} value={data.city} type="text"  placeholder='City'/>
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
                </div>
                <div className="multi-fields">
                    <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text"  placeholder='Zip code'/>
                    <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
            </div>
            <div className="place-order-right">
            <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>subtotal</p>
            <p>{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount()===0?0:40}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+40}</b>
          </div>
        </div>
        <button onClick={handlePayment} type='submit'>PROCEED TO PAYMENT</button>    
      </div>
            </div>
        </form>
  )
}

export default Order