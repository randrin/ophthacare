import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboardService';
import { PatientsService } from '../../../services/patientsService';
import { AuthenticationService } from '../../../services/authenticationService';
import { Patients } from '../../../models/patients/patients';
import { AdministrateursService } from '../../../services/administrateursService';
import { Admins } from '../../../models/administrateurs/admins';
import { ConfirmationService } from 'primeng/primeng';
import { MedecinsService } from '../../../services/medecinsService';
import { Medecins } from '../../../models/medecins/medecins';
import { Maladies } from '../../../models/maladies/maladies';
import { MaladiesService } from '../../../services/maladiesService';

@Component({
  selector: 'app-dashboard',
  providers: [ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public totalPatients: Patients = { list: [] };
  public totalAdmins: Admins = { list: [] };
  public totalMedecins: Medecins = { list: [] };
  public totalMaladies: Maladies = { list: [] };
  public dataBar: any;
  public dataPie: any;
  public blocked;

  // Bar Chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string;
  public barChartLegend: boolean;

  public barChartData: any[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Series A'
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Series B'
    }
  ];

  // Line Chart
  public lineChartOptions: any = {
    maintainAspectRatio: true,
    legend: {
      display: true,
      titleFontColor: '#ffffff'
    },
    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest'
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'ffffff',
            zeroLineColor: 'transparent'
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: '#ffffff'
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'ffffff',
            zeroLineColor: 'transparent'
          },
          ticks: {
            padding: 20,
            fontColor: '#ffffff'
          }
        }
      ]
    }
  };
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];
  public lineChartType: string;
  public lineChartLegend: boolean;
  public lineChartData: any[] = [
    {
      label: 'Patients Soignés',
      backgroundColor: 'rgba(128, 0, 0, .1)',
      borderColor: 'rgba(209, 36, 32)',
      borderWidth: 2,
      color: '#ffffff',
      data: [65, 70, 80, 81, 56, 55, 40, 45, 59, 68, 56, 60]
    },
    {
      label: 'Patients Non-soignés',
      backgroundColor: 'rgba(0, 0, 255, .1)',
      borderColor: 'rgba(79, 29, 218)',
      borderWidth: 2,
      color: '#ffffff',
      data: [60, 48, 40, 19, 86, 65, 90, 89, 68, 79, 69, 11]
    }
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string;

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  constructor(private dashboardService: DashboardService, private patientsService: PatientsService,
    private authenticationService: AuthenticationService, private administrateursService: AdministrateursService,
    private medecinService: MedecinsService, private maladieService: MaladiesService) {
    this.dataBar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.dataPie = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    };
  }

  ngOnInit() {
    this.blocked = true;
    setTimeout(() => {
      this.getAllPatients();
      this.getAllAdministrateurs();
      this.getAllMedecins();
      this.getAllMaladies();
      this.blocked = false;
    }, 1000);

    this.barChartType = 'bar';
    this.lineChartType = 'line';
    this.barChartLegend = true;
    this.lineChartLegend = true;
    this.doughnutChartType = 'doughnut';
  }

  getAllPatients() {
    this.patientsService.getAllPatients(this.authenticationService.getUsername()).subscribe(
      response => {
        if (response.json() != null) {
          this.totalPatients.list = this.totalPatients.list.concat(response.json().filter(n => n));
        }
      });
  }

  getAllAdministrateurs() {
    this.administrateursService.getAllAdmins(this.authenticationService.getUsername()).subscribe(
      response => {
        if (response.json() != null) {
          this.totalAdmins.list = this.totalAdmins.list.concat(response.json().filter(n => n));
        }
      });
  }

  getAllMedecins() {
    this.medecinService.getAllMedecins(this.authenticationService.getUsername()).subscribe(
      response => {
        if (response.json() != null) {
          this.totalMedecins.list = this.totalMedecins.list.concat(response.json().filter(n => n));
        }
      });
  }

  getAllMaladies() {
    this.maladieService.getAllMaladies(this.authenticationService.getUsername()).subscribe(
      response => {
        if (response.json() != null) {
          this.totalMaladies.list = this.totalMaladies.list.concat(response.json().filter(n => n));
        }
      });
  }
}
