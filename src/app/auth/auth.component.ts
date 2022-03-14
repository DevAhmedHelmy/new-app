import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import AuthResponseInterface from './interface/auth.response.interface';
import { AuthService } from './services/auth.service';
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit ,OnDestroy{
  constructor(private authSer: AuthService, private router: Router,private componentFactoryResolver:ComponentFactoryResolver) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  closeSub : Subscription;
  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const data = {
      email: form.value.email,
      password: form.value.password,
    };
    let authObs: Observable<AuthResponseInterface>;
    this.isLoading = true;
    if (this.isLoginMode) {

      authObs = this.authSer.login(data);
    } else {
      authObs = this.authSer.signUp(data);
    }
    authObs.subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
        this.error = errorMessage;
      }
    );
    form.reset();
  }
  ngOnDestroy() {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  onCLose(){
    this.error = null;
  }
  private showErrorAlert(error:string){
  const alert = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const  hostVCR = this.alertHost.vcf;
    hostVCR.clear();
    const componetRef= hostVCR.createComponent(alert);
    componetRef.instance.message = error;
    this.closeSub = componetRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostVCR.clear();
    })

  }
}
