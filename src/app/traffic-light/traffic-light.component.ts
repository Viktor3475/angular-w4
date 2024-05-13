import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css',
})
export class TrafficLightComponent implements OnInit {
  public lightState: { [key: string]: string } = {
    upper: 'red',
    right: 'green',
    bottom: 'red',
    left: 'green',
  }; // началното състояние на светофара

  /*
    upper - светофар в горната част на екрана
    bottom - светофар в долната част на екрана
    right - светофар в дясната част на екрана
    left - светофар в лявата част на екрана

  */

  public emergencyCooldown: boolean = false; // състояние, след като приключи аварията
  public emergency: boolean = false; // състояние на авария
  private seconds: number = 0; // текущи секунди
  private intervalId: any; // задаване и изчистване(triggerEmergency) на интервал

  public ngOnInit(): void {
    // при стартиране на симулацията се извиква функцията updateLights
    this.updateLights();
  }

  public updateLights(): void { // обновяваме състоянието на светлините
    let i: number = 0; // брояч за секунди
    this.intervalId = setInterval(() => {
      this.seconds = i % 14; // целият цикъл на светофара трае 14 секунди
      if (this.seconds < 5) {
        // 5 секунди червено
        this.lightState = {
          upper: 'red',
          right: 'green',
          bottom: 'red',
          left: 'green',
        };
      } else if (this.seconds < 7) {
        // 2 секунди жълто
        this.lightState = {
          upper: 'yellow',
          right: 'yellow',
          bottom: 'yellow',
          left: 'yellow',
        };
      } else if (this.seconds < 12) {
        // 5 секунди зелено
        this.lightState = {
          upper: 'green',
          right: 'red',
          bottom: 'green',
          left: 'red',
        };
      } else {
        // последните 2 секунди свети жълто
        this.lightState = {
          upper: 'yellow',
          right: 'yellow',
          bottom: 'yellow',
          left: 'yellow',
        };
      }
      i++; // увеличаваме брояча за секундите
    }, 1000);
  }

  public cross(trafficLight: string): void {
    // проверка за неправилно пресичане
    if (this.lightState[trafficLight] === 'yellow') {
      alert('Неправилно пресичане.');
    }
  }
  public triggerEmergency(): void {
    clearInterval(this.intervalId); // спира обновяването на светлините
    this.emergency = true;
    this.lightState = { // състояние на светофарите в режим на авария
      upper: 'yellow',
      right: 'yellow',
      bottom: 'yellow',
      left: 'yellow',
    };

    setTimeout(() => {
      // след 10 секунди
      this.lightState = {
        // светлините се връщат в нормално състояние
        upper: 'red',
        right: 'green',
        bottom: 'red',
        left: 'green',
      };
      this.emergency = false; // деактивира аварийното състояние
      this.emergencyCooldown = true; // активира следаварийния период

      setTimeout(() => {
        // след още 10 секунди
        this.emergencyCooldown = false; // се деактивира следаварийния период
      }, 10000);
      this.updateLights(); // рестартира обновяването на светлините
    }, 10000);
  }
}
