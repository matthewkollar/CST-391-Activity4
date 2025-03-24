import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Music Collection';

  displayVersion() {
    alert("Version 2.0");
  }

  displayArtistList() {
    console.log("Artist List Clicked!");
  }
}
