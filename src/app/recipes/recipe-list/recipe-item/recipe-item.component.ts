import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'app/recipes/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: any;
  @Input() index: number;
  constructor() {}

  ngOnInit(): void {}

}
