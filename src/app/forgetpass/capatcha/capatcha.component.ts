import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-capatcha',
  templateUrl: './capatcha.component.html',
  styleUrls: ['./capatcha.component.css']
})
export class CapatchaComponent {
  token: string|undefined;

  constructor() {
    this.token = undefined;
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      console.warn("masarchay");

      return;

    }

    console.debug(`Token [${this.token}] generated`);
    console.error(this.token);
  }
}
