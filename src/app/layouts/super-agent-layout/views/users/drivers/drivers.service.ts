import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http : HttpClient, private authService: LoginService){}


  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3000/drivers");
  }
  
  async addDriver(driverData: any): Promise<any> {
    try {
      const response = await this.authService.getTokenData().toPromise();
      const idAgency = response.agency.id;
      const idSpa = response.id;
      driverData.agencyId = idAgency;
      driverData.spaId = idSpa;

      return this.http.post<any>('http://localhost:3000/auth/driver/register', driverData, { headers: { 'Content-Type': 'application/json' } }).toPromise();
    } catch (error) {
      console.error('Error adding Driver:', error);
      throw error;
    }
  }

  update(){}
  getById(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/drivers/${id}`)
      }
deleteDriver(id:string):Observable<any>{
  return this.http.delete<any>(`http://localhost:3000/drivers/${id}`);
}

getDriversByAgency(idAgency:string){
  return this.http.get<any[]>(`http://localhost:3000/drivers/agency/${idAgency}`);
}

}
