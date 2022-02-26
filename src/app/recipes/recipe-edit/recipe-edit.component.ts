import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id :number;
editMode=false
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((param:Params)=>{
      this.id=+param['id'];
      this.editMode = param['id'] != null? true : false;
    })
  }

}
