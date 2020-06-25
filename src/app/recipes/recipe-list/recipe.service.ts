import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService{
    
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'This is a test', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriouseats.com%2Fimages%2F2016%2F07%2F20160711-eggplant-recipes-roundup-06-1500x1125.jpg&f=1&nofb=1'),
        new Recipe('A diferent recipe', 'Diferent recipe', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriouseats.com%2Fimages%2F2016%2F07%2F20160711-eggplant-recipes-roundup-06-1500x1125.jpg&f=1&nofb=1')
    ]
      
    getRecipes(){
        return this.recipes.slice();
    }
}