import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.css']
})
export class DetectComponent implements OnInit {

  nbFaces = 0;
  uploadedFile: File = null;
  faceApiResponse: any;
  url: any;
  width: number;
  height: number;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  async handleFileInput(event) {
    
    this.nbFaces = 0;
    this.uploadedFile = event.target.files[0];

    await this.data.detectFace_File(this.uploadedFile).subscribe(data => 
    {
      this.faceApiResponse = { ...data };
    })

    this.getPreview(this.uploadedFile);
}

async getData_URL(imageURL: string){

  this.url = imageURL;
  await this.data.detectFace_URL(imageURL).subscribe(data => this.faceApiResponse = { ...data });
}

getPreview(file: File){
  var reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = (event) => { 
  this.url = (<FileReader>event.target).result;
  } 
}

getHeight() {
  var image = document.getElementById('pic') as HTMLImageElement;
  this.height = image.naturalHeight;
  return this.height;
}

getWidth(){
  var image = document.getElementById('pic') as HTMLImageElement;
  this.width = image.naturalWidth;
  return this.width;
}

}
