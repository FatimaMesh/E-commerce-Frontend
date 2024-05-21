import { useDispatch } from "react-redux"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"

import { AppDispatch } from "@/services/store"
import { errorMessage, successMessage } from "@/utility/notify"
import { addCategory, deleteCategory, updateCategory } from "@/services/slices/categorySlice"
import { Category, FormCategory } from "@/types"

//Add & update category
export const CategoryModify = ({ category }: { category: Category | null }) => {
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormCategory>()

  //for update category
  useEffect(() => {
    if (category) {
      setValue("name", category.name)
      setValue("description", category.description)
    }
  }, [category, setValue])

  //add & update category
  const categorySubmit: SubmitHandler<FormCategory> = async (data) => {
    try {
      if (category) {
        const response = await dispatch(
          updateCategory({ categoryId: category.categoryId, category: data })
        ).unwrap()
        successMessage(response.message)
      } else {
        const response = await dispatch(addCategory(data)).unwrap()
        successMessage(response.message)
        reset()
      }
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <section className="popup-window">
      <h1>{category ? "Edit" : "Add New"} Category</h1>
      <form className="add-form" onSubmit={handleSubmit(categorySubmit)}>
        <div>
          <label htmlFor="category-name">Name</label>
          <input
            type="text"
            className="input"
            id="category-name"
            {...register("name", {
              required: "Name Required",
              minLength: { value: 3, message: "Should be more than 3 characters" }
            })}
          />
        </div>
        {errors.name && <p className="error">{errors.name?.message}</p>}
        <label htmlFor="category-description">Description</label>
        <textarea
          className="input"
          rows={4}
          id="category-description"
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
            {category ? "Edit" : "Add"} Category
          </button>
        </div>
      </form>
    </section>
  )
}

//Delete category
export const DeleteCategory = ({ id, onclose }: { id: string; onclose: () => void }) => {
  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    try {
      const response = await dispatch(deleteCategory(id)).unwrap()
      successMessage(response.message)
      onclose()
    } catch (error) {
      errorMessage((error as Error).message)
    }
  }

  return (
    <section className="popup-window">
      <h1>Delete Category</h1>
      <p>Are you sure..!</p>
      <button className="btn confirm" type="submit" onClick={() => handleDelete(id)}>
        Confirm
      </button>
    </section>
  )
}
