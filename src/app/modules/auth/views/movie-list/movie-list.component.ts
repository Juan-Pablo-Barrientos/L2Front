import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gdp-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  closeResult = '';
  model: NgbDateStruct;
  date: { year: number; month: number; } | undefined;

  constructor(private modalService: NgbModal ,private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }

  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }
  openEdit(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
  }
  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
  }
  openCreate(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
  }
}
