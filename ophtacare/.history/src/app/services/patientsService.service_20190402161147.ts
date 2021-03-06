import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsServiceService {

  private patientExportUrl = window['baseUrl'] + '/excel/downloadExcelPatients';

    constructor(
        public router: Router, private http: Http) {
    }

    exportPatients(caller) {
      const options = {
        headers: new Headers({
          'caller': caller
        }),
        responseType: ResponseContentType.Blob
    };
    return this.http.get(this.patientExportUrl, options);
    }
}