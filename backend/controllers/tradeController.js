

//TODO

// const categoryController = (categoryRepositoryInt, categoryRepositoryImpl) => {
//     const repository = categoryRepositoryInt(categoryRepositoryImpl()) // getting return functions from implements to interface functions

//     //view all categories
//     const viewAllCategories = async (req, res, next) => {
//         try {
//             const allCategories = await findAll(repository)
//             res.json(allCategories);
//         } catch (error) {
//             next(error)
//         }
//     }

//     // add a new category 
//     const AddNewCategory = async (req, res, next) => {
//         try {
//             const { name } = req.body
//             const newCategory = await addNewCategory(name, repository)
//             res.status(200).json(newCategory);
//         } catch (error) {
//             next(error);
//         }
//     }

//     const UpdateCategory = async (req, res, next) => {
//         try {
//             const { name } = req.body
//             const id = req.params.id
//             const updatedCategory = await updateOneById(id, name, repository)
//             res.status(200).json(updatedCategory)
//         } catch (error) {
//             next(error);
//         }
//     }
//     const deleteCategory = async (req, res, next) => {
//         try {
//             const { id } = req.params;

//             await deleteCategoryById(id, repository)

//             res.status(204).json({ message: "Category deleted successfully" });
//         } catch (error) {
//             next(error);
//         }
//     }
    
//     return { viewAllCategories, AddNewCategory, UpdateCategory, deleteCategory }
// }

// export default categoryController;

//TODO change this to real backend logic... check the above commited code

import trade_array from "../../assets/dummy/data/fake_trades_array.json"
import order_array from "../../assets/dummy/data/fake_orders_array.json";
import payment_methods from "../../assets/dummy/data/payment_methods.json"
import { includes } from "lodash";


export const getTrades = async (someParameters) => {

    let array1 = trade_array

    // for (let i = 0; i <= 5; i++) {
    //     array1.push.apply(array1, trade_array)
    //   }
    return array1
}



export const getOrders = (someParameters) => {

    let array1 = order_array

    console.log("array1", array1)

    // for (let i = 0; i <= 5; i++) {
    //     array1.push.apply(array1, order_array)
    //   }
    return array1
}


export const getPaymentMethods = (someParameters) => {

    const array1 = payment_methods

    return array1
    
}

export const searchPaymentMethods = (searchValue="") => {

    const array1 = payment_methods



    if(searchValue && searchValue.length > 0) {
        const results = array1.filter((item) => item.toLowerCase().includes(searchValue.toLocaleLowerCase()))
        console.log("results: ", results)
        return results
    }
    return array1
    
}

