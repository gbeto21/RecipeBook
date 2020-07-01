import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription:Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex>-1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name:this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else{
        this.editMode=false;
      }
    })
  }

  onSubmit(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient))
    }
    else{
      //this.slService.addIngredient(newIngredient);
      console.log(newIngredient);
      
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
        )
    this.onClear();
  }

}
