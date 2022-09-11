import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@gdp/auth/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '@gdp/shared/services';

@Component({
  selector: 'gdp-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  faEye = faEye;
  tickets:any;

  constructor(private modalService: NgbModal, private dataService:DataService, private authService:AuthService) { }

  ngOnInit()  {
    if(this.authService.getLoggedUser()){
      this.dataService.getTicketsByDni(this.authService.getLoggedUser().dni).subscribe((response:any)=>{
        response.forEach((ticket:any) => {
          ticket.shows.date_time=ticket.shows.date_time.slice(0,4)
          .concat(ticket.shows.date_time.slice(7,10))
          .concat(ticket.shows.date_time.slice(4,7))
          .concat(" ")
          .concat(ticket.shows.date_time.slice(11,16))
          .concat("Hs")
        })
        this.tickets=response
      })
    }else{
      this.dataService.getTicketsByDni(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!).userDni).subscribe((response:any)=>{
        response.forEach((ticket:any) => {
          ticket.shows.date_time=ticket.shows.date_time.slice(0,4)
          .concat(ticket.shows.date_time.slice(7,10))
          .concat(ticket.shows.date_time.slice(4,7))
          .concat(" ")
          .concat(ticket.shows.date_time.slice(11,16))
          .concat("Hs")
        })
        this.tickets=response
      })

    }
  }


  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }

  searchByMovie() {
    let searchByMovie:any, filter:any, table:any, tr:any, td, i, txtValue;
    searchByMovie = document.getElementById("searchByMovie");
    filter = searchByMovie.value.toUpperCase();
    table = document.getElementById("ticketsList");
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
