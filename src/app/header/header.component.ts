import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/services/auth.service';
import { DataStorageService } from 'app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dataSub = this.authService.user.subscribe((res) => {
      this.isAuth = !!res;
      console.log(this.isAuth);
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
