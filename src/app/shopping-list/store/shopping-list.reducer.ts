import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions'
import { Action } from "@ngrx/store";

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Pies',10)
    ]
}

export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListActions.ShoppingListActions
    ){
    
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: [
                    ...state.ingredients, 
                    action.payLoad
                ]
            };
            break;
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]
            }
            break;
        
        case ShoppingListActions.UPDATE_INGREDIENT:            
            const ingredient = state.ingredients[action.payLoad.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payLoad.ingredient
            }
            const updatedIngredients = [
                ...state.ingredients
            ]
            updatedIngredients[action.payLoad.index] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients
            };

        case ShoppingListActions.DELETE_INGREDIENT:
        

            return {
                ...state,
                ingredients:state.ingredients.filter((ig,igIndex) =>{
                    return igIndex !== action.payLoad;
                })};

        default:
            return state;
    }
}