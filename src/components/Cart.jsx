import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, User, Phone, CheckCircle, QrCode, CreditCard, Banknote } from 'lucide-react';
import { useLenis } from 'lenis/react';

const Cart = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, clearCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Cash, Card
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);
  
  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    transactionId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckoutClick = () => {
    if (cartItems.length > 0) {
      setIsCheckingOut(true);
      setIsSuccess(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Validate payment specific fields
      if (paymentMethod === 'UPI' && formData.transactionId.length !== 12) {
        setErrorMsg('UPI Transaction ID must be exactly 12 digits.');
        setIsSubmitting(false);
        return;
      }
      if (paymentMethod === 'Card' && formData.cardNumber.length < 16) {
        setErrorMsg('Please enter a valid credit/debit card number.');
        setIsSubmitting(false);
        return;
      }

      // Format the WhatsApp message
      let message = `*New Order from SK Juice Center* 🧃\n\n`;
      message += `*Customer Details:*\n`;
      message += `Name: ${formData.customerName}\n`;
      message += `Phone: ${formData.customerPhone}\n`;
      message += `Address: ${formData.customerAddress}\n\n`;
      
      message += `*Order Summary:*\n`;
      cartItems.forEach(item => {
        message += `- ${item.name} (${item.type}) x ${item.quantity} = ₹${item.price * item.quantity}\n`;
      });
      
      message += `\n*Payment Method:* ${paymentMethod}\n`;
      if (paymentMethod === 'UPI') {
        message += `*UPI Transaction ID (UTR):* ${formData.transactionId}\n`;
      } else if (paymentMethod === 'Card') {
        message += `*Card Ending in:* ${formData.cardNumber.slice(-4)}\n`;
      }
      
      message += `\n*Total Amount:* ₹${calculateTotal()}\n`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "918688915833";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Success
      setIsSuccess(true);
      if (clearCart) clearCart();
      setFormData({ 
        customerName: '', 
        customerPhone: '', 
        customerAddress: '', 
        transactionId: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: ''
      });
      
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetView = () => {
    onClose();
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(false);
      setPaymentMethod('UPI');
    }, 300);
  };

  const isEmpty = cartItems.length === 0;
  const totalAmount = calculateTotal();

  return (
    <>
      {/* Overlay backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[1000] backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={resetView}
      />

      {/* Cart Drawer */}
      <div 
        className={`fixed top-0 bottom-0 right-0 h-[100vh] w-full max-w-[450px] bg-white z-[1001] shadow-2xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)] rounded-t-[2.5rem] md:rounded-t-none md:rounded-l-[2.5rem] cart-drawer-compact ${
          isOpen 
            ? 'translate-y-0 md:translate-x-0' 
            : 'translate-y-full md:translate-y-0 md:translate-x-full'
        }`}
        style={{ height: '100vh' }}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-[2.5rem] md:rounded-t-none">
          <h2 className="text-xl font-black text-gray-900">
            {isCheckingOut ? (isSuccess ? 'Order Success' : 'Checkout') : 'Your Cart'}
          </h2>
          <button 
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all active:scale-90"
            onClick={resetView}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {!isCheckingOut ? (
          <>
            {/* Cart Items List */}
            <div data-lenis-prevent className="cart-items p-6 flex flex-col gap-6 hide-scrollbar">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="font-bold text-sm">Your cart is empty.</p>
                  <p className="text-xs text-gray-400 text-center max-w-[200px]">Add fresh juices from our menu to start your order!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-4 pb-6 border-b border-gray-100 relative group animate-slide-up">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-contain rounded-2xl bg-gray-50 p-2 border border-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900 leading-snug">{item.name}</h4>
                      <span className="text-[10px] bg-gray-100 text-gray-500 font-extrabold uppercase px-2 py-0.5 rounded mt-1.5 inline-block">
                        {item.type}
                      </span>
                      <div className="text-sm font-black text-[#6db33f] mt-1.5">₹{item.price}</div>
                      
                      {/* Qty Controls */}
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden w-24 bg-white mt-2.5">
                        <button 
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="flex-1 text-center text-xs font-black text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button 
                      className="absolute top-0 right-0 text-gray-300 hover:text-red-500 p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => removeFromCart(item.cartId)}
                      aria-label="Remove Item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer (TOTAL AMOUNT & CHECKOUT) */}
            <div className="cart-footer">
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-400 font-extrabold tracking-wider text-xs uppercase">TOTAL AMOUNT</span>
                <span className="text-2xl font-black text-gray-900">₹{totalAmount}</span>
              </div>
              <button 
                className="w-full h-[56px] rounded-[16px] bg-[#65B741] hover:bg-[#549c32] hover:scale-[1.02] text-white font-bold text-sm tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:hover:scale-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:pointer-events-none shadow-md"
                disabled={isEmpty}
                onClick={handleCheckoutClick}
              >
                {isEmpty ? 'Add items to continue' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        ) : isSuccess ? (
          /* Success View */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fdfdfd]">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100 animate-pulse">
              <CheckCircle className="w-10 h-10 text-[#6db33f]" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Order Shared!</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
              Thank you for choosing **SK Juice Center**! Your checkout cart receipt has been prepared and opened in WhatsApp. Please send the message to complete your order. We will deliver to your address shortly.
            </p>
            <button 
              className="w-full h-[56px] rounded-[16px] bg-[#65B741] hover:bg-[#549c32] text-white font-bold text-sm uppercase tracking-wide transition-colors shadow-lg active:scale-98"
              onClick={resetView}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <div className="flex-1 flex flex-col justify-between bg-gray-50/30 min-h-0 relative">
            {/* Scrollable Form Content */}
            <div data-lenis-prevent className="cart-items p-6 flex flex-col gap-6 hide-scrollbar">
              
              {/* Order Summary Section */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">Order Summary</h4>
                <div className="flex flex-col gap-2.5">
                  {cartItems.map(item => (
                    <div key={item.cartId} className="flex justify-between items-center text-sm font-semibold text-gray-700">
                      <span>{item.name} <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-1 py-0.5 rounded ml-1 font-bold">{item.type}</span> <span className="text-gray-400 text-xs font-bold ml-1">x{item.quantity}</span></span>
                      <span className="font-extrabold text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-3 mt-1.5 flex justify-between items-center text-sm font-black text-gray-900">
                    <span>Total Subtotal</span>
                    <span className="text-[#6db33f]">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details Form */}
              <form id="checkout-form" onSubmit={placeOrder} className="flex flex-col gap-5">
                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Delivery Details</h4>
                  
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      name="customerName" 
                      required 
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="Enter your name" 
                      className="w-full p-3.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#6db33f] focus:ring-2 focus:ring-[#6db33f]/10 transition-all font-medium text-gray-800"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="customerPhone" 
                      required 
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number" 
                      className="w-full p-3.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#6db33f] focus:ring-2 focus:ring-[#6db33f]/10 transition-all font-medium text-gray-800"
                    />
                  </div>
                  
                  {/* Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Delivery Address
                    </label>
                    <textarea 
                      name="customerAddress" 
                      required 
                      rows="2.5" 
                      value={formData.customerAddress}
                      onChange={handleInputChange}
                      placeholder="Enter house no, street, landmark, area..." 
                      className="w-full p-3.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#6db33f] focus:ring-2 focus:ring-[#6db33f]/10 transition-all font-medium text-gray-800 resize-none"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3.5">Payment Method</h4>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100 mb-4">
                    {[
                      { id: 'UPI', label: 'UPI', icon: QrCode },
                      { id: 'Cash', label: 'Cash', icon: Banknote },
                      { id: 'Card', label: 'Card', icon: CreditCard }
                    ].map(method => {
                      const Icon = method.icon;
                      const isSelected = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`py-2 rounded-xl text-xs font-black uppercase flex flex-col items-center gap-1.5 transition-all ${
                            isSelected 
                              ? 'bg-[#6db33f] text-white shadow-sm' 
                              : 'text-gray-500 hover:text-black hover:bg-gray-100/50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{method.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Info / Sub-sections */}
                  {paymentMethod === 'Cash' && (
                    <div className="p-4 bg-green-50/50 border border-green-100 rounded-2xl text-xs font-semibold text-gray-600 flex items-center gap-2.5 animate-slide-up">
                      <Banknote className="w-5 h-5 text-[#6db33f] flex-shrink-0" />
                      <span>Cash on Delivery selected. You will pay cash to our delivery executive when your fresh juices arrive!</span>
                    </div>
                  )}

                  {paymentMethod === 'UPI' && (
                    <div className="flex flex-col items-center text-center animate-slide-up">
                      <div className="border-4 border-[#6db33f]/10 rounded-2xl p-2 bg-white mb-3 shadow-inner">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=8688915833@slc&pn=SK%20Juice%20Center&am=${totalAmount}&cu=INR`} 
                          alt="Payment QR Code" 
                          className="w-32 h-32 object-contain"
                        />
                      </div>
                      <p className="text-xs text-gray-500 font-bold mb-4 max-w-[280px]">
                        Scan via GPay, PhonePe, Paytm or any UPI app to transfer <span className="text-[#6db33f] font-black text-sm block mt-0.5">₹{totalAmount}</span>
                      </p>
                      <div className="w-full flex flex-col gap-1.5 text-left">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          12-Digit Transaction UTR ID
                        </label>
                        <input 
                          type="text" 
                          name="transactionId" 
                          required={paymentMethod === 'UPI'}
                          minLength="12"
                          maxLength="12"
                          value={formData.transactionId}
                          onChange={handleInputChange}
                          placeholder="e.g. 123456789012" 
                          className="w-full p-3.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#6db33f] focus:ring-2 focus:ring-[#6db33f]/10 transition-all font-mono font-bold tracking-wider text-gray-800 text-center uppercase"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="flex flex-col gap-3.5 animate-slide-up">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Card Number</label>
                        <input 
                          type="text" 
                          name="cardNumber" 
                          required={paymentMethod === 'Card'}
                          maxLength="16"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456" 
                          className="w-full p-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#6db33f] focus:ring-2 focus:ring-[#6db33f]/10 transition-all font-mono text-gray-800 text-center"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Expiry Date</label>
                          <input 
                            type="text" 
                            name="cardExpiry" 
                            required={paymentMethod === 'Card'}
                            placeholder="MM/YY" 
                            maxLength="5"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#6db33f] focus:ring-2 focus:ring-[#6db33f]/10 transition-all text-center"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">CVV</label>
                          <input 
                            type="password" 
                            name="cardCvv" 
                            required={paymentMethod === 'Card'}
                            placeholder="***" 
                            maxLength="3"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#6db33f] focus:ring-2 focus:ring-[#6db33f]/10 transition-all text-center"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>

              {errorMsg && <div className="text-red-500 text-xs font-bold text-center px-4">{errorMsg}</div>}
            </div>

            {/* Checkout Footer (Place Order) */}
            <div className="cart-footer flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-extrabold tracking-wider text-xs uppercase">TOTAL AMOUNT</span>
                <span className="text-2xl font-black text-gray-900">₹{totalAmount}</span>
              </div>
              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full h-[56px] rounded-[16px] bg-[#65B741] hover:bg-[#549c32] hover:scale-[1.02] text-white font-bold text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 shadow-md"
              >
                {isSubmitting ? 'Processing...' : 'Place Order Now'}
              </button>
              <button 
                className="w-full py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 font-extrabold text-[10px] uppercase tracking-widest active:scale-98 transition-all" 
                onClick={() => setIsCheckingOut(false)}
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
