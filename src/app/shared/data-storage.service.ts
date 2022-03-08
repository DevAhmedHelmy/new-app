import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/services/auth.service';
import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';
import { environment } from 'environments/environment';
import { exhaustMap, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authSer: AuthService
  ) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(`${environment.apiUrl}/recipes.json`, recipes)
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchRecipes() {
    return this.authSer.userData.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes.json`, {
          params: new HttpParams().set('auth', user.token),
        });
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return { ...recipe, ingredients: recipe.ingredients ?? [] };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
    // return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes.json`).pipe(
    //   map((recipes) => {
    //     return recipes.map((recipe) => {
    //       return { ...recipe, ingredients: recipe.ingredients ?? [] };
    //     });
    //   }),
    //   tap((recipes) => {
    //     this.recipeService.setRecipes(recipes);
    //   })
    // );
  }
}
