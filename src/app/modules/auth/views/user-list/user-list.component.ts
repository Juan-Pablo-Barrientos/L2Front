import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gdp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  closeResult = '';
  model: NgbDateStruct;
  date: { year: number; month: number; } | undefined;

  constructor(private modalService: NgbModal,private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }

  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
  }
  openEdit(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
  }
  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
  }

}
