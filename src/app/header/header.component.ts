import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/services/auth.service';
import { DataStorageService } from 'app/shared/data-storage.service';
import {map, Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  dataSub: Subscription;

  isAuth = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store:Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {

    this.dataSub = this.store.select('auth').pipe(map(authState=>{return authState})).subscribe((res) => {
      this.isAuth = !!res;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
