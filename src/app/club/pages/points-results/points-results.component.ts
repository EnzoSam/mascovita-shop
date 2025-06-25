import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.interface';
import { PointsBalance } from '../../models/pointBalance.interface';
import { Badge } from '../../models/badge.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-points-results',
  imports: [RouterLink],
  templateUrl: './points-results.component.html',
  styleUrl: './points-results.component.css'
})
export class PointsResultsComponent implements OnInit {
  currentUser: User | undefined;
  currentPointsBalance: PointsBalance | undefined;
  currentBadge: Badge | undefined;
  currentError = '';

  @Output() resetRequest = new EventEmitter<void>();

  constructor(private _activateRoute: ActivatedRoute,
    private _clubService: ClubService
  ) { }
  ngOnInit(): void {


    this._activateRoute.params.subscribe(data => {
      let { userId } = data;
      let { movil } = data;

      if (userId && movil) {
        this._clubService.getUser(userId)
          .subscribe(user => {
            this.currentUser = user;
            if (user) {

              console.log(user)
              console.log(movil)
              if(user.movil === movil)
              {
                this._clubService.getBadge(user?.currentBadgeId).subscribe
                  (bade => {
                    this.currentBadge = bade;
                  });
                this._clubService.getBalance(user?.userId).subscribe
                  (balance => {
                    this.currentPointsBalance = balance;
                  });  
              }   
              else
              {
                this.currentError = 'Los datos del usuario son incorrectos.'
                this.currentUser = undefined;
                this.currentPointsBalance = undefined;
                this.currentBadge = undefined;
              }          
            } else {
              this.currentError = 'El usuario no está registrado 😑 . Los registros del club se actualizan periodicamente. Si ya estas registrado, vuelve a consultar en otro momento. 😺 ';
              this.currentUser = undefined;
              this.currentPointsBalance = undefined;
              this.currentBadge = undefined;
            }
          }
          );
      }
    });
  }

  getMonetaryValue(): number {
    if (this.currentPointsBalance && this.currentBadge) {
      return this.currentPointsBalance.points * this.currentBadge.pointValue;
    }
    return 0;
  }

  onReset(): void {
    this.resetRequest.emit();
  }
}
