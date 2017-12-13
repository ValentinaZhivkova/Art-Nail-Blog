import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth.service';
import {UserProfileModel} from '../models/user-profile.model';
import {ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnChanges {
  userProfile;
  model: UserProfileModel;
  username: string;
  isCurrentUser: boolean;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) {

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
    console.log('USER' + this.isCurrentUser);
    console.log(localStorage.getItem('username'));
    console.log(this.username);
    return this.isCurrentUser = userName === localStorage.getItem('username');

  }

  getUserProfile() {
    console.log(this.username);
    console.log('route' + this.route.snapshot.params['username']);
    this.authService.getUser(this.route.snapshot.params['username'])
      .subscribe(data => {
        this.userProfile = data[0];
        console.log(this.userProfile);
      });
  }

  updateImage() {
    this.userProfile.image = this.model.image;
    this.authService.changeUserImage(this.userProfile._id, this.userProfile)
      .subscribe(data => {

        this.userProfile = data;
      });
  }

  ngOnInit() {
    this.getUserProfile();
  }

  ngOnChanges() {
    this.getUserProfile();
  }
}
