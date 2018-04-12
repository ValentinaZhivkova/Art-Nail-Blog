import {Component, OnChanges, OnInit, ViewContainerRef, DoCheck} from '@angular/core';
import {AuthenticationService} from '../auth.service';
import {UserProfileModel} from '../models/user-profile.model';
import {ActivatedRoute} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';


@Component({
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnChanges, DoCheck {
  userProfile;
  model: UserProfileModel;
  username: string;
  isCurrentUser: boolean;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {

    this.username = this.route.snapshot.params['username'];
    this.model = new UserProfileModel(
      '',
      '',
      '',
      ''
    );
  }

  checkUser() {
    const userName = this.route.snapshot.params['username'];
    return this.isCurrentUser = userName === localStorage.getItem('username');

  }

  getUserProfile() {
    this.authService.getUser(this.route.snapshot.params['username'])
      .subscribe(data => {
        this.userProfile = data[0];
      });
  }

  updateImage() {
    this.userProfile.image = this.model.image;
    this.authService.changeUserImage(this.userProfile._id, this.userProfile)
      .subscribe(data => {

        this.userProfile = data;
        this.model.image = '';
        this.toastr.info('Profile image changed!');
      },
        err => {
        this.toastr.error(err.message);
        });
  }

  ngOnInit() {
    this.getUserProfile();
  }

  ngOnChanges() {
    this.getUserProfile();
  }
  ngDoCheck() {
    // this.getUserProfile()
  }
}
