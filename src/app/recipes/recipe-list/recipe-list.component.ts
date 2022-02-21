import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipe[]=[
    new Recipe('testing','testing',"testing"),
    new Recipe('testing 2','testing 2',"testing 2"),
    new Recipe('testing 3','testing 3',"testing 3"),
    new Recipe('testing 4','testing 4',"testing 4"),
    new Recipe('testing 5','testing 5',"testing 5"),

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
