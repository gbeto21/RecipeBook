import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { 
        path: 'recipes', 
        loadChildren: ()=> import('./recipes/recipes.module').then(m=>m.RecipesMoule)
    },
    { 
        path: 'shopping-list', 
        loadChildren: './shooping-list.module#ShoppingListModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}