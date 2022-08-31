import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { AuthService } from 'src/app/modules/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal, public authService:AuthService ) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn() === true){console.log(this.authService.isLoggedIn())}

  }

  logOut(){

  }



  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }

}
