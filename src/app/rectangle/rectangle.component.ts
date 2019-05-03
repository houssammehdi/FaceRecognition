import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit {

  nbFaces = 0;
  rectangle = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0 ,0]];

  @Input() faceApiResponse: any;

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
    return this.nbFaces + " faces detected";
  }

  applyRectangle(){

    for(var i = 0; i <= this.nbFaces; i++){
        let element = document.getElementById((i+1).toString());
        let factor_height = this.height / 400;
        let factor_width = this.width / 400;
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
        element2.style.display = "none";
      }
  }



}
