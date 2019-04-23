import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-train',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.css']
})
export class IdentifyComponent implements OnInit {

  uploadedFiles = [];
  faceIds: string[] = [];
  url: any;
  matchName: string;
  matchId: string;
  matchData: string;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  handleFileInput(event){
    this.uploadedFiles = event.target.files;
    this.getPreview(this.uploadedFiles[0]);
    this.data.detectFace_File(this.uploadedFiles[0]).subscribe(
      (data: FaceRecognitionResponse) => { 
        let ressource = data[0];
        this.faceIds[0] = ressource["faceId"];
      });
  }

  async faceIdentify(group_id: string){

    const getID = await this.data.faceIdentify(group_id, this.faceIds).toPromise().then(data => this.matchId = data.body[0].candidates[0].personId);
  
    const getName = await this.data.getPerson(group_id, this.matchId).toPromise().then(data =>
      {
        this.matchName = data.body["name"] 
        this.matchData = data.body["userData"]
      });

  }


  getPreview(file: File){
    var reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = (event) => { 
    this.url = (<FileReader>event.target).result;
    } 
  }
}
