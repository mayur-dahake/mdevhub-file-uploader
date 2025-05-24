import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dailog-component',
  standalone: false,
  templateUrl: './common-dailog-component.component.html',
  styleUrl: './common-dailog-component.component.scss'
})
export class CommonDailogComponentComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
