import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parent } from '../model/Parent';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public async getClient(): Promise<Parent[]> {
    let endpoint = environment.endpoint + environment.apiClient;
    let clients: any = await this.http.get(endpoint, this.header).toPromise();
    return clients;
  }

  public async GetClientByID(id: number): Promise<Parent> {
    let endpoint = environment.endpoint + environment.apiClient + id;
    let client: any = await this.http.get(endpoint, this.header).toPromise();
    return client;
  }

  public async DeleteClient(id: number): Promise<void> {
    let endpoint = environment.endpoint + environment.apiClient + id;
    await this.http.delete(endpoint, this.header).toPromise();
  }

  public async CreateClient(client: Parent): Promise<void> {
    let endpoint = environment.endpoint + environment.apiClient;
    await this.http.post(endpoint, client,this.header).toPromise();
  }

  public async updateClient(client: Parent): Promise<void> {
    let endpoint = environment.endpoint + environment.apiClient;
    await this.http.put(endpoint, client,this.header).toPromise();
  }



  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }
}