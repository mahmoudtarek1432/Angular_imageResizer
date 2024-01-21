import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image, ImageSizings } from './Type/Image';
import { Observable } from 'rxjs';
import { Globals } from './shared/global';
import { Serializer } from '@angular/compiler';
import { Extention, FillType } from './Type/fillType';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private client: HttpClient, private globals: Globals) { }

  getImages():Observable<Image[]>{
    return this.client.get<Image[]>(this.globals.baseUrl+"ImageResizer/FetchImages")
  }

  pushImage(imageFile: File, sizings: ImageSizings[], fillType: FillType, extentionType: Extention) : Observable<any>{
    const data= new FormData();
    data.append('file', imageFile)
    data.append('sizingsJson', JSON.stringify(sizings))
    if(fillType != undefined)
      data.append('fill', fillType.toString())

    if(extentionType != undefined)
          data.append('extention', Extention[extentionType])

    return this.client.post<any>(this.globals.baseUrl+"ImageResizer/UploadImage", data)
  }
}
