import { Component, OnInit, Input } from '@angular/core';
import { DetectComponent } from '../detect/detect.component';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {

  nbFaces = 0;
  rectangle = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0 ,0]];

  @Input() faceApiResponse: FaceRecognitionResponse;

  @Input() width: number;

  @Input() height: number;

  constructor() { }

  ngOnInit() {

  }


  getRectangle(){
    this.nbFaces = 0;
    for(var i = 0; i<4; i++){
      if(this.faceApiResponse[i]){
        this.nbFaces++;
        let resources = this.faceApiResponse[i];
        let resource = resources["faceRectangle"];
        this.rectangle[i] = 
        [ 
          resource["top"],
          resource["left"],
          resource["width"],
          resource["height"] 
        ];
      }
    }
    this.applyRectangle();
    console.log(this.rectangle);
    return this.nbFaces + " detected";
  }

  applyRectangle(){

    console.log('nbface ' + this.nbFaces);

    for(var i = 0; i <= this.nbFaces; i++){
        let element = document.getElementById((i+1).toString());
        let factor_height = this.height / 400;
        let factor_width = this.width / 400;
        console.log((i+1).toString() + " this is element");
        if(element){
          element.style.display = "block";
          element.style.top = (this.rectangle[i][0] / factor_height) + "px";
          element.style.left = (this.rectangle[i][1] / factor_width) + "px";
          element.style.width = (this.rectangle[i][2] / factor_width) + "px";
          element.style.height = (this.rectangle[i][3] / factor_height) + "px";
        }
    }

      for(var j = this.nbFaces+1; j <= 4; j++){
        let element2 = document.getElementById(j.toString());
        console.log('removed' + j.toString());
        element2.style.display = "none";
      }
  }



}
