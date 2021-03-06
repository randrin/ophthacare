import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { ProfilService } from '../../../services/profilService';
import { AuthenticationService } from '../../../services/authenticationService';
import { Admin } from '../../../models/administrateurs/admin';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profil',
  providers: [ConfirmationService],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public blocked;
  public showEdit;
  public showUpload;
  public profilAdmin = new Admin(0, '', '', '', '', '', '', '', '', '');
  public selectedImage;
  public getImage;
  public imgUrl;

  constructor(private profilService: ProfilService, private authenticationService: AuthenticationService,
    private messageService: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getProfilAdministrateur();
  }

  getProfilAdministrateur() {
    this.blocked = true;
    this.profilAdmin = this.authenticationService.admin;
    this.downloadImage();
    setTimeout(() => {
      this.blocked = false;
    }, 1000);
  }

  modifierProfil() {
    this.profilAdmin = this.authenticationService.admin;
    this.showEdit = true;
  }

  public onFileChanged(event) {
    console.log('Event selected: ' + event);
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = () => {
      this.imgUrl = reader.result;
      this.showUpload = true;
    };
  }

  public downloadImage() {
    this.profilService.downloadProfil(this.authenticationService.getUsername()).subscribe(
      response => {
        console.log('getImage: ' + JSON.stringify(response));
        let reader = new FileReader();
        reader.readAsDataURL(response.json()._body);
        reader.onload = () => {
          this.getImage = reader.result;
        };
        //let objectURL = 'data:image/jpeg;base64,' + response.json()._body;
        //this.getImage = window.URL.createObjectURL(response);
      }
    );
  }

  public uploadImage() {
    this.profilService.uploadProfil(this.selectedImage, this.authenticationService.getUsername()).subscribe(
      response => {
        this.blocked = false;
        if (response.json().code !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: response.json().code,
            detail: response.json().message
          });
        } else {
          this.messageService.add({
            sticky: false,
            severity: 'success',
            summary: 'Succès',
            detail: 'Image ajourné'
          });
        }
      },
      error => {
        this.blocked = false;
        this.messageService.add({
          sticky: true,
          severity: 'error',
          
          summary: 'Erreur',
          detail: 'Erreur Technique'
        });
      });
  }

  public profilBack() {
    this.showEdit = false;
    this.getProfilAdministrateur();
  }
}
