import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faFacebook, faGithub, faGoogle, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faFacebook = faFacebook;
  faGithub = faGithub;
  faGoogle = faGoogle;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;

}
