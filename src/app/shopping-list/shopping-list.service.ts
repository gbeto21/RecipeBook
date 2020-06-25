import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Pies',10)
    ]

    getIngreients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }

}