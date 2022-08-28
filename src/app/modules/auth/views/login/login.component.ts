import { Component, OnInit } from '@angular/core';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faArrowRightToBracket = faArrowRightToBracket;

  constructor() { }

  ngOnInit(): void {
  }

}
