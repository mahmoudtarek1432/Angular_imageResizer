import { Component } from '@angular/core';
import { ImageServiceService } from '../image-service.service';
import { Observable } from 'rxjs';
import { Image } from '../Type/Image';
import { Globals } from '../shared/global';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {
  images!:Observable<Image[]>
  selectedImage?: Image
  constructor(private imageService: ImageServiceService,
              public globals: Globals){
    this.images = imageService.getImages();
  }

  adjustPath(imagePath: string, width: number, height: number){
    let end = imagePath.substring(imagePath.lastIndexOf("."),imagePath.length)
    return imagePath.replace(end,"_"+width+"_"+height+end)
  }

  changeSelectedImage(image: Image){
    this.selectedImage = image;
    this.globals.highlightedColor = image.dominantColorHex
  }

  extractNameFromPath(path:string){
    return path.substring(path.lastIndexOf('/')+1,path.lastIndexOf('.'))
  }
}
