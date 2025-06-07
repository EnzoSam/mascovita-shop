import { Routes } from '@angular/router';
import { PointsIdentificationComponent } from '../pages/points-identification/points-identification.component';
import { PointsResultsComponent } from '../pages/points-results/points-results.component';
import { ClubService } from '../services/club.service';
export const clubRoutes : Routes = [
    { path: '', redirectTo: 'identification', pathMatch:'full' },
    { path: 'identification', component:PointsIdentificationComponent },
    { path: 'results/:userId/:movil',
       component:PointsResultsComponent,
      providers:[ClubService] },
  ];
