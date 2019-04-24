import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})

export class TrainComponent implements OnInit {

  create_group_response: any;
  create_person_response: any;
  add_image_response: any;
  get_person_response: any;
  train_response: any;

  person_image: File = null;

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  handleFileInput(event){
    this.person_image = event.target.files[0];
  }

  createGroup(id:string, name:string, data:string){
    this.data.createPersonGroup(id, name, data).subscribe(res => { this.create_group_response = res.status }, error => console.log(error));
  }

  createPerson(group_id: string, name:string, data:string){
    this.data.createPerson(group_id, name, data).subscribe(res => { this.create_person_response = res.body }, error => console.log(error));
  }

  addImage(group_id: string, image: File, personID: string){
    this.data.addPersonImage(group_id, image, personID).subscribe(res => { this.add_image_response = res.body }, error => console.log(error));
  }

  getPerson(groupID: string, personID: string){
    this.data.getPerson(groupID, personID).subscribe(res => { this.get_person_response = res.body }, error => console.log(error));
  }

  trainGroup(group_id:string){
    this.data.trainGroup(group_id).subscribe(res => { this.train_response = res.status, console.log(res) }, error => console.log(error));
  }

  trainFromFolder(){
    // TODO
  }

}
