import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  contactusForm: FormGroup;
  sending: boolean;


  get firstName() {
    // console.log(this.contactusForm.get('firstName').status['VALID']);
    return this.contactusForm.get('firstName');
  }

  get lastName() {
    return this.contactusForm.get('lastName');
  }

  get email() {
    return this.contactusForm.get('email');
  }

  get message() {
    return this.contactusForm.get('message');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.contactusForm = new FormGroup({
      firstName : new FormControl(null, Validators.required),
      lastName : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      message : new FormControl(null, Validators.required),
    });
    this.sending = false;
  }

  sendMessage(formData: NgForm) {
    this.sending = true;
    console.log(formData);
    // this.http.post('http://localhost:4200/home', JSON.stringify(formData));
    setTimeout(() => {
      this.sending = false;
      this.cancelForm();
    }, 1000);
  }

  cancel() {
    this.cancelForm();
  }

  cancelForm() {
    this.router.navigate([{outlets: { popup: null }}] );
  }

}
