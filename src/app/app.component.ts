import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
