import s from './application-info.module.scss';
import {v4 as uuidv4} from 'uuid';
import Link from 'next/link';
import React, {useState, useContext} from 'react';
import {useRouter} from 'next/router';
import PhoneInput from 'react-phone-input-2';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import {useForm} from 'react-hook-form';
import validator from 'validator';
import {getPrice, getPriceValue} from '../../utils';
import countries from './delivery';
import {Context} from '../../pages/_app';
import {forEach} from "react-bootstrap/ElementChildren";

const ApplicationInfo = ({cartItems}) => {
  // console.log(cartItems)
  const [state, dispatch] = useContext(Context);
  const currency = state.currency === 'USD' ? 'USD' : 'UZS';
  const user = process.browser && JSON.parse(localStorage.getItem('info'));
  const router = useRouter();
  
  const [emailError, setEmailError] = useState();

  const validateEmail = (e) => {
    var email = e.target.value;
    setEmail(email);

    if (validator.isEmail(email)) {
      setEmailError();
    } else {
      setEmailError('Неверный Email');
    }
  };

  const [email, setEmail] = useState(user && user.email ? user.email : '');
  const [name, setName] = useState(user && user.name ? user.name : '');
  const [phone, setPhone] = useState(user && user.phone ? user.phone : '');
  const [country, setCountry] = useState(user && user.country ? user.country : 'Uzbekistan');
  const [city, setCity] = useState(user && user.city ? user.city : 'Toshkent shahri');
  const [address, setAddress] = useState(user && user.address ? user.address : '');
  const [comment, setComment] = useState(user && user.comment ? user.comment : '');
  const [feedback, setFeedback] = useState(user && user.feedback ? user.feedback : '');

  const {register, handleSubmit, errors} = useForm();

  const sendInfo = () => {
    localStorage.setItem(
        'info',
        JSON.stringify({
          email: email,
          name: name,
          phone: phone,
          country: country,
          city: city,
          address: address,
          comment: comment,
          feedback: feedback,
        }),
    );
    router.push('/application-payment');
  };

  let time = '';
  let weight = 0;
  let delivery = 0;
  let cartTotalPrice = 0;

  let couponFront
  
  const sendCoupon = process.browser && JSON.parse(localStorage.getItem('coupon'));

  cartItems.map((product) => {
    product.weight && (weight += (parseInt(product.weight) * product.quantity) / 1000);
    cartTotalPrice += product.onSale
        ? getPriceValue(product, 'sale') * product.quantity
        : getPriceValue(product) * product.quantity;
  });

  if (sendCoupon && sendCoupon.discountType === 'FIXED_CART' && sendCoupon.amount) {
    cartTotalPrice -= sendCoupon.amount
    couponFront = getPrice(sendCoupon.amount)
  }
  if (sendCoupon && sendCoupon.discountType === 'PERCENT' && sendCoupon.amount) {
    const couponSale = Math.round((cartTotalPrice * sendCoupon.amount) / 100)
    cartTotalPrice = cartTotalPrice - couponSale
    couponFront = sendCoupon.amount + '%'
  }

  function inRange(x, min, max) {
    return (x - min) * (x - max) <= 0;
  }

  // const productSale = cartItems.find(product => product.onSale)

  if (country === 'Uzbekistan') {
    if (city === 'Toshkent shahri') {
      time = '1-2 дня';
      cartTotalPrice <= 300000 ? delivery = 20000 : delivery = 0
      if (currency === "USD") {
        cartTotalPrice <= 30 ? delivery = 2 : delivery = 0
      }
    } else {
      time = '3-7 дней после оплаты';
      cartTotalPrice <= 300000 ? delivery = 30000 : delivery = 0
      if (currency === "USD") {
        cartTotalPrice <= 30 ? delivery = 3 : delivery = 0
      }
    }
  } else {
    const deliveryCountry = countries.find(({name}) => name === country);
    if (deliveryCountry) {
      if (inRange(weight, 0, 0.25)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n025));
      }
      if (inRange(weight, 0.25, 0.5)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n02505));
      }
      if (inRange(weight, 0.5, 1)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n051));
      }
      if (inRange(weight, 1, 2)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n12));
      }
      if (inRange(weight, 2, 3)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n23));
      }
      if (inRange(weight, 3, 4)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n34));
      }
      if (inRange(weight, 4, 5)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n45));
      }
      if (inRange(weight, 5, 6)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n56));
      }
      if (inRange(weight, 6, 7)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n67));
      }
      if (inRange(weight, 7, 8)) {
        delivery = parseInt(Math.ceil(deliveryCountry.n78));
      }
    }
    time = '7-30 дней после оплаты';
  }

  function joki(val) {
    setCountry(val);
    if (val === 'Uzbekistan') {
      dispatch({type: 'UZ'});
    } else {
      dispatch({type: 'USD'});
    }
    return;
  }

  return (
      <div>
        {cartItems.length >= 1 ? (
            <section className={s.wrapper}>
              <div className={s.form}>
                <div className={s.row}>
                  <div className={`${s.formData} ${s.col} `}>
                    <div>Имя и Фамилия *</div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name && s.errorInput}
                        ref={register({required: true})}
                        name="name"
                    />
                  </div>
                  <div className={s.col}>
                    <div className={s.phoneInput}> Номер телефона *</div>
                    <PhoneInput
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                        country="uz"
                        placeholder="+998 (99) 999-99-99"
                        masks={{uz: '(..) ...-..-..'}}
                        inputClass={errors.phone && s.errorInput}
                    />
                  </div>
                </div>
                <div className={s.row}>
                  <div className={`${s.formData} ${s.col2}`}>
                    <div>Страна *</div>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => joki(val)}
                        className={errors.country && s.errorInput}
                        defaultOptionLabel="Выберите страну"
                        priorityOptions={['UZ']}
                        whitelist={countries.map(({code}) => code)}
                    />
                  </div>
                  <div className={`${s.formData} ${s.col2}`}>
                    <div>Город *</div>
                    <RegionDropdown
                        country={country}
                        value={city}
                        onChange={(val) => setCity(val)}
                        className={errors.city && s.errorInput}
                        blankOptionLabel="Старана не выбрана"
                        defaultOptionLabel="Выберите город"
                    />
                  </div>
                  <div className={`${s.formData} ${s.col2}`}>
                    <div>Адрес *</div>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={errors.address && s.errorInput}
                        ref={register({required: true})}
                        name="address"
                    />
                  </div>
                </div>
                <div className={s.row}>
                  <div className={s.formData}>
                    <div>
                      Email
                      <br/>
                      <br/>
                      {<div style={{color: 'red'}}> {emailError} </div>}
                    </div>
                    <input value={email} onChange={(e) => validateEmail(e)} name="email" type="email"/>
                  </div>
                </div>
                <div className={s.row}>
                  <div className={s.formData}>
                    <div> Обратная связь</div>
                    <select value={feedback} onChange={(e) => setFeedback(e.target.value)}>
                      <option disabled/>
                      <option>Телефон</option>
                      <option>Telegram</option>
                      <option>Whatsapp</option>
                    </select>
                  </div>
                </div>
                <div className={s.row}>
                  <div className={s.comment}>
                    <div> Примечание</div>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)}/>
                  </div>
                </div>
                <div className={s.deliveryInfo}>
                  <img src='/application/warning2.svg'/>
                  <div className={s.extraData}>
                    При покупке на сумму свыше 300,000 действует бесплатная доставка.
                  </div>
                </div>

                <div className={s.lastRow}>
                  {/* <div className={s.register}>
            <Link href=''>
              <a>
                <div>
                  <img src='/application/tick.svg' alt='' />
                </div>
                <span> Зарегистрировать вас?</span>
              </a>
            </Link>
          </div> */}
                  <div className={s.payment}>
                    <button type="submit" onClick={handleSubmit(sendInfo)}>
                      К оплате
                      <img src="/application/next.svg" alt=""/>
                    </button>
                  </div>
                </div>
                <div className={s.deliveryInfo2}>
                  <img src='/application/warning2.svg'/>
                  <div className={s.extraData}>
                    При покупке на сумму свыше 300,000 действует бесплатная доставка.
                  </div>
                </div>
              </div>

              <div className={s.cart}>
                {cartItems.length >= 1 ? (
                    <div className={s.cartBlock}>
                      {cartItems.map((product) => {
                        return (
                            <div key={uuidv4()} className={s.cartItemList}>
                              <img src={product.selectedProductImage} alt=""/>
                              <div>
                                <div className={s.cartName}>{product.name}</div>
                                <span className={s.cartPrice}>
                          {product.onSale
                              ? getPrice(getPriceValue(product, 'sale'))
                              : getPrice(getPriceValue(product))}
                        </span>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                ) : null}
                <div className={s.finalCheckRow}>
                  <div className={s.finalCheck}>
                    <div>Время</div>
                    <div className={s.delivery}>{time}</div>
                  </div>
                  <div className={s.finalCheck}>
                    <div className={s.deliveryText}>Доставка</div>
                    <div className={s.delivery}>
                      {getPrice(delivery)}
                    </div>
                  </div>
                  <div className={s.finalCheck}>
                    <div > Купон</div>
                    <div >{couponFront || '0 сум'}</div>
                </div>
                  <div className={s.finalCheck}>
                    <div>Подытог</div>
                    <div>{cartTotalPrice ? getPrice(cartTotalPrice) : '0 сум'}</div>
                  </div>
                  <div className={s.finalCheck}>
                    <div>Итого</div>
                    <div>{cartTotalPrice ? getPrice(cartTotalPrice + delivery) : '0 сум'}</div>
                  </div>
                </div>

                <div className={s.offer}>
                  <Link href="/help#1">
                    <a>
                      <img src="/product-card/delivery.svg" alt=""/>
                      <span>Информация о доставке</span>
                    </a>
                  </Link>
                  <Link href="/help#5">
                    <a>
                      <img src="/product-card/wear.svg" alt=""/>
                      <span>Бесплатная примерка одежды дома</span>
                    </a>
                  </Link>
                  <Link href="/help#3">
                    <a>
                      <img src="/header/payment.svg" alt=""/>
                      <span>Возможность оплаты после доставки</span>
                    </a>
                  </Link>
                  <Link href="/help#2">
                    <a>
                      <img src="/product-card/return.svg" alt=""/>
                      <span>Гарантия на обмен или возврат товара</span>
                    </a>
                  </Link>
                </div>
              </div>
            </section>
        ) : (
            <div className={s.emptyCart}>
              Корзина пуста
              <Link href="/catalog/zhenskaya">
                <a>Начать покупки</a>
              </Link>
            </div>
        )}
      </div>
  );
};

export default ApplicationInfo;
