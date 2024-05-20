import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { addProduct, deleteProduct, updateProduct } from "@/services/slices/productSlice"
import { AppDispatch } from "@/services/store"
import { Category, FormProduct, Product } from "@/types"
import { errorMessage, successMessage } from "@/utility/notify"


//Add product
export const AddProduct = ({ categories }: { categories: Category[] }) => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormProduct>()

  //add product
  const productSubmit: SubmitHandler<FormProduct> = async (data) => {
    try {
      const response = await dispatch(addProduct(data)).unwrap()
      successMessage(response.message)
      reset()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <section className="add-product">
      <h1>Add Product</h1>
      <form className="Add-form" onSubmit={handleSubmit(productSubmit)}>
        <div>
          <label htmlFor="product-name">Name</label>
          <input
            type="text"
            className="input"
            id="product-name"
            {...register("name", {
              required: "Name Required",
              minLength: { value: 3, message: "Should be more than 3 characters" }
            })}
          />
        </div>
        {errors.name && <p className="error">{errors.name?.message}</p>}
        <div>
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            className="input"
            id="product-price"
            {...register("price", {
              required: "Price Required",
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: "Have to be a Number"
              },
              min: { value: 1, message: "The price should be POSITIVE" }
            })}
          />
        </div>
        {errors.price && <p className="error">{errors.price?.message}</p>}
        <div>
          <label htmlFor="product-image">ImageURL</label>
          <input
            type="text"
            className="input"
            id="product-image"
            {...register("image", {
              required: "Image url Required",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Enter a valid URL"
              }
            })}
          />
        </div>
        {errors.image && <p className="error">{errors.image?.message}</p>}
        <div>
          <label htmlFor="product-category">Category</label>
          <select
            className="input"
            id="product-category"
            {...register("categoryId", { required: "Category is required" })}
          >
            {categories &&
              categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {errors.categoryId && <p className="error">{errors.categoryId?.message}</p>}
        <label htmlFor="description">Description</label>
        <textarea
          className="input"
          rows={4}
          id="description"
          {...register("description", {
            required: "Description Required",
            minLength: { value: 20, message: "Should be more than 20 characters" }
          })}
        />
        {errors.description && <p className="error">{errors.description?.message}</p>}
        <div>
          <button className="btn" onClick={() => reset()}>
            Clear
          </button>
          <button className="btn" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </section>
  )
}

//Delete product
export const DeleteProduct = ({ id, onclose }: { id: string; onclose: () => void }) => {
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteProduct(id)).unwrap()
      successMessage(response.message)
      onclose()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <section className="add-product">
      <h1>Delete Product</h1>
      <p>Are you sure..!</p>
      <button className="btn confirm" type="submit" onClick={() => handleDelete(id)}>
        Confirm
      </button>
    </section>
  )
}

//Edit product
export const EditProduct = ({ product }: { product: Product}) => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormProduct>()

  //add product
  const productSubmit: SubmitHandler<FormProduct> = async (data) => {
    try {
      const response = await dispatch(
        updateProduct({ productId: product.productId, product: data })
      ).unwrap()
      successMessage(response.message)
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  // Set values to form fields with selected product info
  useEffect(() => {
    setValue("name", product.name)
    setValue("price", product.price)
    setValue("image", product.image)
    setValue("description", product.description)
  }, [product, setValue])

  return (
    <section className="add-product">
      <h1>Edit Product</h1>
      <form className="Add-form" onSubmit={handleSubmit(productSubmit)}>
        <div>
          <label htmlFor="update-product-name">Name</label>
          <input
            type="text"
            className="input"
            id="update-product-name"
            {...register("name", {
              required: "Name Required",
              minLength: { value: 3, message: "Should be more than 3 characters" }
            })}
          />
        </div>
        {errors.name && <p className="error">{errors.name?.message}</p>}
        <div>
          <label htmlFor="update-product-price">Price</label>
          <input
            type="number"
            className="input"
            id="update-product-price"
            {...register("price", {
              required: "Price Required",
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: "Have to be a Number"
              },
              min: { value: 1, message: "The price should be POSITIVE" }
            })}
          />
        </div>
        {errors.price && <p className="error">{errors.price?.message}</p>}
        <div>
          <label htmlFor="update-product-image">ImageURL</label>
          <input
            type="text"
            className="input"
            id="update-product-image"
            {...register("image", {
              required: "Image url Required",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Enter a valid URL"
              }
            })}
          />
        </div>
        {errors.image && <p className="error">{errors.image?.message}</p>}
        <label htmlFor="update-description">Description</label>
        <textarea
          className="input"
          rows={4}
          id="update-description"
          {...register("description", {
            required: "Description Required",
            minLength: { value: 20, message: "Should be more than 20 characters" }
          })}
        />
        {errors.description && <p className="error">{errors.description?.message}</p>}
        <div>
          <button className="btn" type="submit">
            Edit Product
          </button>
        </div>
      </form>
    </section>
  )
}
