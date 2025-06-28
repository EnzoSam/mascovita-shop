import { Routes } from '@angular/router';
import { PointsIdentificationComponent } from '../pages/points-identification/points-identification.component';
import { PointsResultsComponent } from '../pages/points-results/points-results.component';
import { ClubService } from '../services/club.service';
import { ClubTermsComponent } from '../pages/club-terms/club-terms.component';
export const clubRoutes : Routes = [
    { path: '', redirectTo: 'terms', pathMatch:'full' },
    {path:'terms', component:ClubTermsComponent},
    { path: 'consulta', component:PointsIdentificationComponent },
    { path: 'results/:userId/:movil',
       component:PointsResultsComponent,
      providers:[ClubService] },
  ];
