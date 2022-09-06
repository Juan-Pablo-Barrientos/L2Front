import { Component, OnInit } from '@angular/core';
import { DataService } from '@gdp/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gdp-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit {

  contacts:any;

  constructor(private modalService: NgbModal, private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getContacts().subscribe((response:any)=>{
      this.contacts=response;
    })
  }


  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }

}
