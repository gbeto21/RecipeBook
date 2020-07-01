import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions'
import { Action } from "@ngrx/store";

export interface State{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState{
    shopinList:State;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Pies',10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(
    state: State = initialState, 
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