import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEye} from '@fortawesome/free-solid-svg-icons';

//Services
import { DataService } from '@gdp/shared/services';

@Component({
  selector: 'gdp-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit {
  faEye = faEye;

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

  searchByEmail() {
    let searchByEmail:any, filter:any, table:any, tr:any, td, i, txtValue;
    searchByEmail = document.getElementById("searchByEmail");
    filter = searchByEmail.value.toUpperCase();
    table = document.getElementById("contactUsList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

}
