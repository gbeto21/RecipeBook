import { Ingredient } from 'src/app/shared/ingredient.model';

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, descrip: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name;
        this.description = descrip;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}