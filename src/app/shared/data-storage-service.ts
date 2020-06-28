import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { RecipeService } from '../recipes/recipe-list/recipe.service';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService){

    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('https://recipe-book-c2f8d.firebaseio.com/recipes.json',recipes)
            .subscribe(response=>{

            })
    }

    fetchRecipes(){
        this.http
            .get<Recipe[]>('https://recipe-book-c2f8d.firebaseio.com/recipes.json')
            .subscribe(recipes=>{
                this.recipeService.setRecipes(recipes);
                console.log(this.recipeService.getRecipes());
            })
    }

}