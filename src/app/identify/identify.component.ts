import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { stringify } from '@angular/core/src/render3/util';

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

  async handleFileInput(event, group_id: string){
    this.uploadedFiles = event.target.files;
    this.getPreview(this.uploadedFiles[0]);
    const getIDs = await this.data.detectFace_File(this.uploadedFiles[0]).toPromise().then(data => 
      { 
        let ressource = data[0];
        this.faceIds[0] = ressource["faceId"];
      }, 
      error => console.log(error));
    this.faceIdentify(group_id);
  }

  async faceIdentify(group_id: string){

    const getID = await this.data.faceIdentify(group_id, this.faceIds).toPromise().then(data => this.matchId = data.body[0].candidates[0].personId);
  
    const getName = await this.data.getPerson(group_id, this.matchId).toPromise().then(data =>
      {
        this.matchName = data.body["name"] 
        this.matchData = data.body["userData"]
      });
  }


  async handleUrlInput(url: string, group_id: string){
    this.url = url;
    const getIDs = await this.data.detectFace_URL(url).toPromise().then(data => 
      { 
        let ressource = data[0];
        this.faceIds[0] = ressource["faceId"];
      }, 
      error => console.log(error));
    this.faceIdentify(group_id);
  }


  getPreview(file: File){
    var reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = (event) => { 
    this.url = (<FileReader>event.target).result;
    } 
  }
}
