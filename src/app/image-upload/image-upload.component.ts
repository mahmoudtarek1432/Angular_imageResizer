import { Component, numberAttribute } from '@angular/core';
import { ImageSizings } from '../Type/Image';
import { ImageServiceService } from '../image-service.service';
import { Extention, FillType } from '../Type/fillType';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  imageSizings: ImageSizings[] = [];
  imagefile: File | undefined
  fillType!: FillType
  fillConsts: {id: string, value: string}[] = []
  extentionType!: Extention
  extentionConsts: {id: string, value: string}[] = []

  constructor(private imageService: ImageServiceService){
    for(let [key, value] of Object.entries(FillType)){
      if(!isNaN(Number(key))) //if key is not a number
        continue;
      this.fillConsts.push({id: value as string, value: key as string})
    }

    for(let [key, value] of Object.entries(Extention)){
      if(!isNaN(Number(key))) //if key is not a number
        continue;
      this.extentionConsts.push({id: value as string, value: key as string})
    }

    console.log(this.fillConsts)
  }
  uploadFile(event:any){
    this.imagefile  = event.target!.files[0]
    console.log(this.imagefile)
    this.imageSizings = [{width: 0, height: 0}] //after uploading the file reveal sizings.
  }

  fillChanged(event:any){
    this.fillType = event.target.value
    console.log(this.fillType)
  }

  extentionChanged(event:any){
    this.extentionType = event.target.value
    console.log(this.extentionType)
  }

  addSizing(){
    this.imageSizings.push({width: 0, height: 0})
  }

  pushToServer(){
    this.imageSizings = this.imageSizings.map(e => {
      e.height = Number.parseInt(e.height+"")
      e.width = Number.parseInt(e.width+"")
      return e
    })
    console.log(this.imageSizings);
    
    this.imageService.pushImage(this.imagefile!, this.imageSizings,this.fillType, this.extentionType).subscribe(r => {
      this.fillType = FillType.None;
      this.imageSizings = []
      this.imagefile = undefined
    })
  }

  updateValue(prop: number, event:any){
    prop = event.target.value

  }
}
