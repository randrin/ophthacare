import { Component, OnInit } from '@angular/core';
import { PatientsServiceService } from '../../services/patientsservice.service';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../services/authenticationService';
import saveAs from 'save-as';
import { Patients } from 'src/app/models/patients/patients';

@Component({
  selector: 'app-patients',
  providers: [ConfirmationService],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  public col: any[];
  public patients: Patients = { list: [] };
  public response = {
    code: 0,
    message: ''
  };

  constructor(private patientsService: PatientsServiceService, private messageService: MessageService, 
    private authenticationService: AuthenticationService) { 
      this.col = [
        { field: 'nomPatient', header: 'Nom' },
        { field: 'prenomPatient', header: 'Prènom' },
        { field: 'sexePatient', header: 'Sexe' },
        { field: 'dateNaisPatient', header: 'Date Naissance' },
        { field: 'agePatient', header: 'Age' },
        { field: 'emailPatient', header: 'Email' },
        { field: 'numTelPatient', header: 'N° Cellulaire' },
        { field: 'numFixePatient', header: 'N° Fixe' },
        { field: 'addressePatient', header: 'Domicile' },
        { field: 'domicilePatient', header: 'Code Postale' },
        { field: 'infoSupplPatient', header: 'Infos Supplémentaires' },
        { field: 'detail', header: 'Modifier' },
        { field: 'detail', header: 'Effacer' },
      ];
    }

  ngOnInit() {
    this.getPatients();
  }

  getPatiensts () {

  }
  
  exportExcelFile() {
    console.log('Export excel file called: -> Patients');
    this.patientsService.exportPatients(this.authenticationService.getUsername()).subscribe(
      data => {
        console.log('Response: ' + JSON.stringify(data));
        this.response = {
          code: data.status,
          message: data.statusText
        };
        if (this.response.message !== 'OK') {
          this.messageService.add({
            sticky: true,
            severity: 'error',
            summary: 'Error code ' + this.response.code,
            detail: 'Message ' + this.response.message
          });
        } else {
          this.downloadFile(data);
        }
      },
      error => {
        this.messageService.add({
          sticky: true,
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Error'
        });
      }
    );
  }

  downloadFile(data: any) {
    const blob = new Blob([data.blob()], { type: 'application/octet-stream' });
    saveAs(blob, 'Patients_OphthaCare.xlsx');
  }
}
