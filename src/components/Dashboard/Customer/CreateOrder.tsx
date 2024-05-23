import { useForm } from "react-hook-form"
import { BiMoney } from "react-icons/bi"
import { FaRegCreditCard, FaApple, FaBackward } from "react-icons/fa"
import { useDispatch } from "react-redux"

import { usePage } from "@/context/PageContext"
import { FormOrder } from "@/types"
import { AppDispatch } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"
import { addOrder } from "@/services/slices/orderSlice"
import { orderConfirm } from "@/services/slices/orderItemsSlice"

export const CreateOrder = () => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormOrder>()

  const { setOpenPage } = usePage()
  const handleOrderConfirm = async (data: FormOrder) => {
    try {
      const response = await dispatch(addOrder(data)).unwrap()
      successMessage(response.message)
      reset()
      dispatch(orderConfirm())
    } catch (error) {
      errorMessage((error as Error).name)
    }
  }

  return (
    <div className="payment-card">
      <h1>Payment Details</h1>
      <form className="checkout" onSubmit={handleSubmit(handleOrderConfirm)}>
        <address className="address-info">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            placeholder="Address"
            className="input"
            {...register("deliveryAddress", {
              required: "DeliveryAddress Required",
              minLength: { value: 20, message: "Address Should be longer" }
            })}
          />
        </address>
        {errors.deliveryAddress && <p className="error">{errors.deliveryAddress.message}</p>}
        <section className="payment-info">
          <label htmlFor="payment">Payment</label>
          <div className="payment-method">
            <div>
              <input type="radio" value="Cash" {...register("paymentMethod", { required: true })} />{" "}
              <label>
                <BiMoney /> Cash
              </label>
            </div>
            <div>
              <input
                type="radio"
                value="Credit Card"
                {...register("paymentMethod", { required: true })}
              />{" "}
              <label>
                <FaRegCreditCard /> Credit Card
              </label>
            </div>
            <div>
              <input
                type="radio"
                value="ApplePay"
                {...register("paymentMethod", { required: true })}
              />{" "}
              <label>
                <FaApple /> ApplePay
              </label>
            </div>
          </div>
        </section>
        {errors.paymentMethod && <p className="error">Payment method Required</p>}
        <section className="confirm-order">
          <p className="nav-link" onClick={() => setOpenPage("shop")}>
            <FaBackward /> Back to shop
          </p>
          <button type="submit" className="btn">
            Checkout
          </button>
        </section>
      </form>
    </div>
  )
}
