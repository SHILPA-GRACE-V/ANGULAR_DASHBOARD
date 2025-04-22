import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-file-manager',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'] 
})
export class FileManagerComponent {}
