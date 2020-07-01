import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import * as fromApp from '../../store/app.reducer'

@Injectable()
export class RecipeService{

    recipiesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];

    constructor(
        private store: Store<fromApp.AppState>
        ){

    }

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipiesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        // this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
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