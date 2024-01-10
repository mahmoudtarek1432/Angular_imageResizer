import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.scss']
})
export class ImageComponentComponent {
  @Input() imageSrc!: string;
  @Input() ImageSizing!: string;
}
