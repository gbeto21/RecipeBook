import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    recipiesChanged = new Subject<Recipe[]>();
    
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A test recipe', 
    //         'This is a test', 
    //         'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriouseats.com%2Fimages%2F2016%2F07%2F20160711-eggplant-recipes-roundup-06-1500x1125.jpg&f=1&nofb=1',
    //         [
    //             new Ingredient('Meat',1),
    //             new Ingredient('French Fries',20),
    //         ]),
    //         new Recipe('A diferent recipe', 
    //         'Diferent recipe', 
    //         'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriouseats.com%2Fimages%2F2016%2F07%2F20160711-eggplant-recipes-roundup-06-1500x1125.jpg&f=1&nofb=1',
    //         [
    //             new Ingredient('Buns',2),
    //             new Ingredient('Meat',1),
    //         ])
    // ]
    
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService){

    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipiesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipiesChanged.next(this.recipes.slice());
    }
    
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipiesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipiesChanged.next(this.recipes.slice());
    }
}