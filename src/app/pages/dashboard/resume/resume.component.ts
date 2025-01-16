import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  imports: [IonContent, HeaderPageComponent],
})
export class ResumeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
