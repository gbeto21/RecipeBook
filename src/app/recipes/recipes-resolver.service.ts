import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe-list/recipe.model';
import { DataStorageService } from '../shared/data-storage-service';
import { RecipeService } from './recipe-list/recipe.service';


@Injectable({providedIn: 'root'})
export class RecipesResolveService implements Resolve<Recipe[]>{

    constructor(
        private dataStorageService: DataStorageService, 
        private recipesService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipesService.getRecipes();

        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }
        else{
            return recipes;
        }
    }

}