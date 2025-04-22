import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgFor, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, DatePipe, HttpClientModule, RouterModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  dropdownOpen = false;
  searchText: string = '';

  username: string = '';
  role: string = '';
  name: string = '';

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
          this.role = user.role;
          this.name = user.name;
        });
      }
    }

    this.http.get<any[]>('http://localhost:3000/api/projects').subscribe(data => {
      this.projects = data;
    });
  }

  get filteredProjects() {
    return this.projects.filter(p =>
      p.file_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.author.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.file_type.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }



  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
      window.location.href = '/';
    }
  }
}
