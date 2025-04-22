import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  name = '';
  role = '';
  showCard = true; 

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentUsername = sessionStorage.getItem('username');
      if (currentUsername) {
        this.http.get<any>(`http://localhost:3000/api/user/${currentUsername}`).subscribe(user => {
          this.username = user.username;
          this.name = user.name;
          this.role = user.role;
        });
      }
    }
  }
  closeCard(): void {
    this.showCard = false;
    this.router.navigate(['/dashboard']);
  }
}
