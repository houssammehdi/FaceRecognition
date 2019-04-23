import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  response: any = [];
  private endpoint_url = 'https://westeurope.api.cognitive.microsoft.com';
  private detect_url = this.endpoint_url + '/face/v1.0/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise';
  private person_groups_url = this.endpoint_url + '/face/v1.0/persongroups/';
  private face_identify_url = this.endpoint_url + '/face/v1.0/identify';
  private subscriptionKey: string = '0840e407275d4e1caf04198f894aba58';

  constructor(private http: HttpClient) { }

  private get_Image_Upload_Headers() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/octet-stream');
    headers = headers.set('Ocp-Apim-Subscription-Key', this.subscriptionKey);
    return headers;
  }

  private getHeaders(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Ocp-Apim-Subscription-Key', this.subscriptionKey);
    return headers;
  }

  detectFace_File(image: File){
    return this.http.post<FaceRecognitionResponse>(this.detect_url, image, { headers: this.get_Image_Upload_Headers()});
  }

  detectFace_URL(imageURL: string){
    console.log(imageURL);
    return this.http.post<FaceRecognitionResponse>(this.detect_url, {url: imageURL}, { headers: this.getHeaders()});
  }

  createPersonGroup(group_name: string, _name: string, _userData: string){
    return this.http.put<any>(this.person_groups_url + group_name, {name: _name, userData: _userData}, { headers: this.getHeaders(), responseType: 'json', observe: 'response'});
  }

  createPerson(group_id:string, _name: string, _userData: string){
    return this.http.post<any>(this.person_groups_url + group_id + '/persons/', {name: _name, userData: _userData}, { headers: this.getHeaders(), responseType: 'json', observe: 'response'});
  }

  addPersonImage(group_id: string, image: File, personID: string){
    return this.http.post<any>(this.person_groups_url + group_id + '/persons/' + personID + '/persistedFaces', image, { headers: this.get_Image_Upload_Headers(), responseType: 'json', observe:'response'})
  }

  getPerson(group_id: string, _personID: string){
    return this.http.get<any>(this.person_groups_url + group_id + '/persons/' + _personID, { headers: this.getHeaders(), responseType: 'json', observe: 'response'})
  } 

  getPersonFace(_personGroupID: string, _personID: string, _persistedFaceID: string){
    return this.http.get<any>(this.person_groups_url + _personGroupID + '/persons/' + _personID + '/persistedFaces/' + _persistedFaceID, { headers: this.getHeaders(), responseType: 'json', observe: 'response'})
  }

  trainGroup(group_id: string){
    let headers = this.getHeaders();
    console.log(headers);
    return this.http.post<any>(this.person_groups_url + group_id + '/train', { headers: headers, responseType: 'json', observe: 'response' })
  }

  faceIdentify(group_id: string, _faceIds: string[]){
    return this.http.post<any>(this.face_identify_url, { faceIds: _faceIds, personGroupId: group_id }, { headers: this.getHeaders(), responseType: 'json', observe: 'response' });
  }
}

