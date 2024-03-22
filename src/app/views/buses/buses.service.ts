import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  constructor(private http: HttpClient ) {}

getAllBuses(): Observable<any[]>{
  return this.http.get<any[]>("http://localhost:3000/buses");
}

addBus(marque:string, puissance: string, nbrePlaces:string, status:string){
  
    const bus = { marque, puissance, nbrePlaces, status };
    return this.http.post<any>('http://localhost:3000/buses/add', bus, { headers: {'Content-Type': 'application/json'} });

  
}

updateBus(id:string, bus:any):Observable<any>{

  return this.http.patch<any>(`http://localhost:3000/buses/${id}`, bus, { headers: {'Content-Type': 'application/json'} })
  }

  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/buses/${id}`)
      }
      deleteBus(id:string):Observable<any>{
        return this.http.delete<any>(`http://localhost:3000/buses/${id}`)
    
      }

}
