import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  constructor() { }

  height: number = 100;
  width: number = 100;

  @Input() enlace_facebook?: string;
  @Input() enlace_instagram?: string;
  @Input() enlace_sitio_web?: string;

  ngOnInit(): void {
  }

  abrirFacebook() {
    window.open(this.enlace_facebook);
  }

  abrirInstagram() {
    window.open(this.enlace_instagram);
  }

  abrirSitioWeb() {
    window.open(this.enlace_sitio_web);
  }

}
